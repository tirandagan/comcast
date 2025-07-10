import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { AnalyticsEvent } from '@/types/analytics';

interface AnalyticsDB extends DBSchema {
  events: {
    key: string;
    value: AnalyticsEvent;
    indexes: {
      'by-timestamp': number;
      'by-type': string;
      'by-session': string;
    };
  };
  metadata: {
    key: string;
    value: any;
  };
}

export class OfflineStorage {
  private db: IDBPDatabase<AnalyticsDB> | null = null;
  private readonly dbName = 'sutherland-analytics';
  private readonly version = 1;
  private readonly maxEvents = 10000;
  private readonly maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

  public async initialize(): Promise<void> {
    try {
      this.db = await openDB<AnalyticsDB>(this.dbName, this.version, {
        upgrade(db) {
          // Create events store
          if (!db.objectStoreNames.contains('events')) {
            const eventStore = db.createObjectStore('events', {
              keyPath: 'eventId',
            });
            eventStore.createIndex('by-timestamp', 'timestamp');
            eventStore.createIndex('by-type', 'eventType');
            eventStore.createIndex('by-session', 'sessionId');
          }

          // Create metadata store
          if (!db.objectStoreNames.contains('metadata')) {
            db.createObjectStore('metadata');
          }
        },
        blocked() {
          console.warn('Analytics DB upgrade blocked by other tabs');
        },
        blocking() {
          console.warn('Analytics DB upgrade blocking other tabs');
        },
      });

      // Clean up old events on initialization
      await this.cleanupOldEvents();
    } catch (error) {
      console.error('Failed to initialize offline storage:', error);
      throw error;
    }
  }

  public async saveEvents(events: AnalyticsEvent[]): Promise<void> {
    if (!this.db) {
      throw new Error('Offline storage not initialized');
    }

    const tx = this.db.transaction('events', 'readwrite');
    
    try {
      // Add all events
      await Promise.all(
        events.map(event => tx.store.add(event).catch(() => {
          // Ignore duplicate key errors
        }))
      );
      
      await tx.done;

      // Check if we need to cleanup
      const count = await this.getEventCount();
      if (count > this.maxEvents) {
        await this.cleanupExcessEvents();
      }
    } catch (error) {
      console.error('Failed to save events to offline storage:', error);
      throw error;
    }
  }

  public async getPendingEvents(limit?: number): Promise<AnalyticsEvent[]> {
    if (!this.db) {
      throw new Error('Offline storage not initialized');
    }

    try {
      const tx = this.db.transaction('events', 'readonly');
      const index = tx.store.index('by-timestamp');
      
      if (limit) {
        const events: AnalyticsEvent[] = [];
        let cursor = await index.openCursor();
        
        while (cursor && events.length < limit) {
          events.push(cursor.value);
          cursor = await cursor.continue();
        }
        
        return events;
      } else {
        return await tx.store.getAll();
      }
    } catch (error) {
      console.error('Failed to get pending events:', error);
      return [];
    }
  }

  public async clearPendingEvents(eventIds?: string[]): Promise<void> {
    if (!this.db) {
      throw new Error('Offline storage not initialized');
    }

    const tx = this.db.transaction('events', 'readwrite');

    try {
      if (eventIds) {
        // Delete specific events
        await Promise.all(
          eventIds.map(id => tx.store.delete(id))
        );
      } else {
        // Clear all events
        await tx.store.clear();
      }
      
      await tx.done;
    } catch (error) {
      console.error('Failed to clear pending events:', error);
      throw error;
    }
  }

  public async getEventCount(): Promise<number> {
    if (!this.db) {
      return 0;
    }

    try {
      return await this.db.count('events');
    } catch (error) {
      console.error('Failed to get event count:', error);
      return 0;
    }
  }

  public async getEventsByType(eventType: string, limit?: number): Promise<AnalyticsEvent[]> {
    if (!this.db) {
      throw new Error('Offline storage not initialized');
    }

    try {
      const tx = this.db.transaction('events', 'readonly');
      const index = tx.store.index('by-type');
      
      if (limit) {
        const events: AnalyticsEvent[] = [];
        let cursor = await index.openCursor(eventType);
        
        while (cursor && events.length < limit) {
          events.push(cursor.value);
          cursor = await cursor.continue();
        }
        
        return events;
      } else {
        return await index.getAll(eventType);
      }
    } catch (error) {
      console.error('Failed to get events by type:', error);
      return [];
    }
  }

  public async getEventsBySession(sessionId: string): Promise<AnalyticsEvent[]> {
    if (!this.db) {
      throw new Error('Offline storage not initialized');
    }

    try {
      const tx = this.db.transaction('events', 'readonly');
      const index = tx.store.index('by-session');
      return await index.getAll(sessionId);
    } catch (error) {
      console.error('Failed to get events by session:', error);
      return [];
    }
  }

  public async saveMetadata(key: string, value: any): Promise<void> {
    if (!this.db) {
      throw new Error('Offline storage not initialized');
    }

    try {
      await this.db.put('metadata', value, key);
    } catch (error) {
      console.error('Failed to save metadata:', error);
      throw error;
    }
  }

  public async getMetadata(key: string): Promise<any> {
    if (!this.db) {
      throw new Error('Offline storage not initialized');
    }

    try {
      return await this.db.get('metadata', key);
    } catch (error) {
      console.error('Failed to get metadata:', error);
      return null;
    }
  }

  private async cleanupOldEvents(): Promise<void> {
    if (!this.db) {
      return;
    }

    const cutoffTime = Date.now() - this.maxAge;
    const tx = this.db.transaction('events', 'readwrite');
    const index = tx.store.index('by-timestamp');

    try {
      let cursor = await index.openCursor(IDBKeyRange.upperBound(cutoffTime));
      
      while (cursor) {
        await cursor.delete();
        cursor = await cursor.continue();
      }
      
      await tx.done;
    } catch (error) {
      console.error('Failed to cleanup old events:', error);
    }
  }

  private async cleanupExcessEvents(): Promise<void> {
    if (!this.db) {
      return;
    }

    const excessCount = await this.getEventCount() - this.maxEvents;
    if (excessCount <= 0) {
      return;
    }

    const tx = this.db.transaction('events', 'readwrite');
    const index = tx.store.index('by-timestamp');

    try {
      let cursor = await index.openCursor();
      let deleted = 0;
      
      while (cursor && deleted < excessCount) {
        await cursor.delete();
        deleted++;
        cursor = await cursor.continue();
      }
      
      await tx.done;
    } catch (error) {
      console.error('Failed to cleanup excess events:', error);
    }
  }

  public async getStorageStats(): Promise<{
    eventCount: number;
    oldestEvent: number | null;
    newestEvent: number | null;
    storageEstimate?: StorageEstimate;
  }> {
    if (!this.db) {
      throw new Error('Offline storage not initialized');
    }

    const stats: any = {
      eventCount: await this.getEventCount(),
      oldestEvent: null,
      newestEvent: null,
    };

    try {
      // Get oldest event
      const oldestTx = this.db.transaction('events', 'readonly');
      const oldestCursor = await oldestTx.store.index('by-timestamp').openCursor();
      if (oldestCursor) {
        stats.oldestEvent = oldestCursor.value.timestamp;
      }

      // Get newest event
      const newestTx = this.db.transaction('events', 'readonly');
      const newestCursor = await newestTx.store.index('by-timestamp').openCursor(null, 'prev');
      if (newestCursor) {
        stats.newestEvent = newestCursor.value.timestamp;
      }

      // Get storage estimate if available
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        stats.storageEstimate = await navigator.storage.estimate();
      }
    } catch (error) {
      console.error('Failed to get storage stats:', error);
    }

    return stats;
  }

  public async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}