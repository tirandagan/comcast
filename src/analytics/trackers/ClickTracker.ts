import { AnalyticsSDK } from '../core/AnalyticsSDK';
import type { ClickEvent } from '@/types/analytics';

export class ClickTracker {
  private analytics: AnalyticsSDK;
  private lastClickTime: number = 0;
  private clickCooldown: number;
  private isEnabled: boolean = false;
  private boundHandler: (event: MouseEvent) => void;

  constructor(analytics: AnalyticsSDK) {
    this.analytics = analytics;
    this.clickCooldown = analytics.getTrackingOptions().clickCooldownMs;
    this.boundHandler = this.handleClick.bind(this);
  }

  public enable(): void {
    if (this.isEnabled) return;
    
    document.addEventListener('click', this.boundHandler, true);
    this.isEnabled = true;
  }

  public disable(): void {
    if (!this.isEnabled) return;
    
    document.removeEventListener('click', this.boundHandler, true);
    this.isEnabled = false;
  }

  private handleClick(event: MouseEvent): void {
    // Implement cooldown to prevent duplicate events
    const now = Date.now();
    if (now - this.lastClickTime < this.clickCooldown) {
      return;
    }
    this.lastClickTime = now;

    const target = event.target as HTMLElement;
    if (!target) return;

    // Skip tracking for certain elements
    if (this.shouldSkipElement(target)) {
      return;
    }

    const elementData = this.getElementData(target);
    const coordinates = {
      clientX: event.clientX,
      clientY: event.clientY,
      pageX: event.pageX,
      pageY: event.pageY,
    };

    const clickEvent: Omit<ClickEvent, 'eventId' | 'timestamp' | 'sessionId' | 'userId' | 'pageUrl' | 'pageTitle' | 'userAgent' | 'viewport'> = {
      eventType: 'click',
      elementData,
      coordinates,
      metadata: {
        button: event.button,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
      },
    };

    this.analytics.track(clickEvent);
  }

  private getElementData(element: HTMLElement): ClickEvent['elementData'] {
    return {
      tagName: element.tagName.toLowerCase(),
      className: element.className || undefined,
      id: element.id || undefined,
      text: this.getElementText(element),
      href: (element as HTMLAnchorElement).href || undefined,
      path: this.getElementPath(element),
    };
  }

  private getElementText(element: HTMLElement): string | undefined {
    // Get meaningful text from the element
    let text = element.textContent?.trim() || '';
    
    // Limit text length
    if (text.length > 100) {
      text = text.substring(0, 97) + '...';
    }
    
    // Get aria-label if no text
    if (!text && element.getAttribute('aria-label')) {
      text = element.getAttribute('aria-label') || '';
    }
    
    // Get title if still no text
    if (!text && element.title) {
      text = element.title;
    }
    
    // Get alt text for images
    if (!text && element.tagName === 'IMG') {
      text = (element as HTMLImageElement).alt || '';
    }
    
    // Get value for inputs
    if (!text && element.tagName === 'INPUT') {
      const input = element as HTMLInputElement;
      if (input.type === 'button' || input.type === 'submit') {
        text = input.value;
      }
    }
    
    return text || undefined;
  }

  private getElementPath(element: HTMLElement): string {
    const path: string[] = [];
    let current: HTMLElement | null = element;
    
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      
      if (current.id) {
        selector += `#${current.id}`;
      } else if (current.className) {
        const classes = current.className.split(' ').filter(c => c.trim());
        if (classes.length > 0) {
          selector += `.${classes.join('.')}`;
        }
      }
      
      // Add index if there are siblings with the same tag
      const siblings = current.parentElement?.children;
      if (siblings) {
        const sameTags = Array.from(siblings).filter(
          sibling => sibling.tagName === current!.tagName
        );
        if (sameTags.length > 1) {
          const index = sameTags.indexOf(current);
          selector += `:nth-of-type(${index + 1})`;
        }
      }
      
      path.unshift(selector);
      current = current.parentElement;
    }
    
    return path.join(' > ');
  }

  private shouldSkipElement(element: HTMLElement): boolean {
    // Skip password inputs
    if (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'password') {
      return true;
    }
    
    // Skip elements with data-no-track attribute
    if (element.hasAttribute('data-no-track')) {
      return true;
    }
    
    // Skip if any parent has data-no-track
    let parent = element.parentElement;
    while (parent) {
      if (parent.hasAttribute('data-no-track')) {
        return true;
      }
      parent = parent.parentElement;
    }
    
    return false;
  }

  public updateOptions(options: { clickCooldownMs?: number }): void {
    if (options.clickCooldownMs !== undefined) {
      this.clickCooldown = options.clickCooldownMs;
    }
  }

  // Get click statistics
  public getStats(): {
    isEnabled: boolean;
    lastClickTime: number;
  } {
    return {
      isEnabled: this.isEnabled,
      lastClickTime: this.lastClickTime,
    };
  }

  // Programmatically track a click
  public trackClick(
    element: HTMLElement,
    coordinates: { clientX: number; clientY: number; pageX: number; pageY: number },
    metadata?: Record<string, any>
  ): void {
    const elementData = this.getElementData(element);
    
    const clickEvent: Omit<ClickEvent, 'eventId' | 'timestamp' | 'sessionId' | 'userId' | 'pageUrl' | 'pageTitle' | 'userAgent' | 'viewport'> = {
      eventType: 'click',
      elementData,
      coordinates,
      metadata: {
        ...metadata,
        programmatic: true,
      },
    };

    this.analytics.track(clickEvent);
  }
}