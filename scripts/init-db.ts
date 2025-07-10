import 'dotenv/config';
import sql from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function initDatabase() {
  console.log('🚀 Initializing Supabase database...\n');

  try {
    // Test connection
    const test = await sql`SELECT NOW() as time`;
    console.log('✅ Connected to database at:', test[0].time);

    // Create ENUM types
    console.log('\n📦 Creating ENUM types...');
    await sql`
      DO $$ BEGIN
        CREATE TYPE role AS ENUM ('USER', 'ADMIN');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await sql`
      DO $$ BEGIN
        CREATE TYPE registration_status AS ENUM ('PENDING', 'APPROVED', 'DENIED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await sql`
      DO $$ BEGIN
        CREATE TYPE approval_status AS ENUM ('PENDING', 'APPROVED', 'DENIED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await sql`
      DO $$ BEGIN
        CREATE TYPE activity_type AS ENUM (
          'PAGE_VIEW', 'CLICK', 'SCROLL', 'INTERACTION', 'DOWNLOAD',
          'ANNOTATION', 'BOOKMARK', 'SHARE', 'QUIZ_ATTEMPT',
          'VIDEO_PLAY', 'CHART_INTERACTION'
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    // Create users table
    console.log('📋 Creating users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        phone TEXT NOT NULL,
        password TEXT,
        role role DEFAULT 'USER',
        registration_status registration_status DEFAULT 'PENDING',
        email_verified TIMESTAMPTZ,
        verification_token TEXT,
        banned BOOLEAN DEFAULT false,
        banned_at TIMESTAMPTZ,
        banned_reason TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        last_login_at TIMESTAMPTZ
      );
    `;

    // Create sessions table
    console.log('📋 Creating sessions table...');
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        session_token TEXT UNIQUE NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires TIMESTAMPTZ NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
    `;

    // Create registration_approvals table
    console.log('📋 Creating registration_approvals table...');
    await sql`
      CREATE TABLE IF NOT EXISTS registration_approvals (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        approved_by TEXT REFERENCES users(id),
        status approval_status NOT NULL,
        reason TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_registration_approvals_user_id ON registration_approvals(user_id);
      CREATE INDEX IF NOT EXISTS idx_registration_approvals_approved_by ON registration_approvals(approved_by);
    `;

    // Create chapters table
    console.log('📋 Creating chapters table...');
    await sql`
      CREATE TABLE IF NOT EXISTS chapters (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        "order" INTEGER NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // Create sections table
    console.log('📋 Creating sections table...');
    await sql`
      CREATE TABLE IF NOT EXISTS sections (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        chapter_id TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        slug TEXT NOT NULL,
        "order" INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(chapter_id, slug)
      );
      CREATE INDEX IF NOT EXISTS idx_sections_chapter_id ON sections(chapter_id);
    `;

    // Create user_activities table
    console.log('📋 Creating user_activities table...');
    await sql`
      CREATE TABLE IF NOT EXISTS user_activities (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        session_id TEXT,
        activity_type activity_type NOT NULL,
        metadata JSONB DEFAULT '{}',
        timestamp TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_activities_timestamp ON user_activities(timestamp);
    `;

    // Create user_progress table
    console.log('📋 Creating user_progress table...');
    await sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        chapter_id TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
        section_id TEXT REFERENCES sections(id) ON DELETE CASCADE,
        progress_percentage FLOAT DEFAULT 0,
        time_spent INTEGER DEFAULT 0,
        last_viewed_at TIMESTAMPTZ DEFAULT NOW(),
        completed_at TIMESTAMPTZ,
        UNIQUE(user_id, chapter_id, section_id)
      );
      CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_progress_chapter_id ON user_progress(chapter_id);
    `;

    // Create user_annotations table
    console.log('📋 Creating user_annotations table...');
    await sql`
      CREATE TABLE IF NOT EXISTS user_annotations (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        chapter_id TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
        section_id TEXT REFERENCES sections(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        annotation TEXT,
        position JSONB NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_user_annotations_user_id ON user_annotations(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_annotations_chapter_id ON user_annotations(chapter_id);
    `;

    // Create user_bookmarks table
    console.log('📋 Creating user_bookmarks table...');
    await sql`
      CREATE TABLE IF NOT EXISTS user_bookmarks (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        chapter_id TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
        title TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, chapter_id)
      );
      CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user_id ON user_bookmarks(user_id);
    `;

    // Create daily_analytics table
    console.log('📋 Creating daily_analytics table...');
    await sql`
      CREATE TABLE IF NOT EXISTS daily_analytics (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        date DATE UNIQUE NOT NULL,
        total_users INTEGER DEFAULT 0,
        active_users INTEGER DEFAULT 0,
        new_registrations INTEGER DEFAULT 0,
        avg_session_time FLOAT DEFAULT 0,
        total_page_views INTEGER DEFAULT 0,
        metadata JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_daily_analytics_date ON daily_analytics(date);
    `;

    // Create content_performance table
    console.log('📋 Creating content_performance table...');
    await sql`
      CREATE TABLE IF NOT EXISTS content_performance (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        chapter_id TEXT NOT NULL,
        date DATE NOT NULL,
        views INTEGER DEFAULT 0,
        avg_time_spent FLOAT DEFAULT 0,
        completion_rate FLOAT DEFAULT 0,
        engagement_score FLOAT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(chapter_id, date)
      );
      CREATE INDEX IF NOT EXISTS idx_content_performance_chapter_id ON content_performance(chapter_id);
      CREATE INDEX IF NOT EXISTS idx_content_performance_date ON content_performance(date);
    `;

    // Create or update admin user
    console.log('\n👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('Sam99sonite', 10);
    
    const existingAdmin = await sql`
      SELECT id FROM users WHERE email = 'tiran@tirandagan.com'
    `;

    if (existingAdmin.length === 0) {
      await sql`
        INSERT INTO users (
          email, name, title, phone, password, role, 
          registration_status, email_verified
        ) VALUES (
          'tiran@tirandagan.com',
          'Tiran Dagan',
          'Global Head of Industry & Product Innovation',
          '9088732425',
          ${hashedPassword},
          'ADMIN',
          'APPROVED',
          NOW()
        )
      `;
      console.log('✅ Admin user created');
    } else {
      await sql`
        UPDATE users 
        SET password = ${hashedPassword},
            role = 'ADMIN',
            registration_status = 'APPROVED'
        WHERE email = 'tiran@tirandagan.com'
      `;
      console.log('✅ Admin user updated');
    }

    // Seed chapters
    console.log('\n📚 Seeding chapters...');
    const chapters = [
      {
        title: 'Executive Summary',
        slug: 'executive-summary',
        order: 1,
        description: 'A strategic proposal for Sutherland\'s AI transformation...',
        content: 'Content will be loaded from markdown files',
      },
      // Add more chapters as needed
    ];

    for (const chapter of chapters) {
      await sql`
        INSERT INTO chapters (title, slug, "order", description, content)
        VALUES (${chapter.title}, ${chapter.slug}, ${chapter.order}, ${chapter.description}, ${chapter.content})
        ON CONFLICT (slug) DO NOTHING
      `;
    }

    console.log('\n✅ Database initialization complete!');
    
    // Show table count
    const tables = await sql`
      SELECT COUNT(*) as count FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log(`📊 Total tables created: ${tables[0].count}`);

  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    await sql.end();
  }
}

// Run the initialization
initDatabase();