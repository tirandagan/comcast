import 'dotenv/config';
import sql from '../src/lib/db';

async function verifyDatabase() {
  console.log('🔍 Verifying Supabase database setup...\n');

  try {
    // Check connection
    const test = await sql`SELECT NOW() as time`;
    console.log('✅ Connected to database at:', test[0].time);

    // Check tables
    const tables = await sql`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `;
    
    console.log('\n📋 Tables in database:');
    tables.forEach(t => console.log(`  - ${t.tablename}`));

    // Check admin user
    const adminUser = await sql`
      SELECT id, email, name, role, "registrationStatus" 
      FROM users 
      WHERE email = 'tiran@tirandagan.com'
    `;
    
    if (adminUser.length > 0) {
      console.log('\n✅ Admin user found:');
      console.log(`  - Email: ${adminUser[0].email}`);
      console.log(`  - Name: ${adminUser[0].name}`);
      console.log(`  - Role: ${adminUser[0].role}`);
      console.log(`  - Status: ${adminUser[0].registrationStatus}`);
    }

    // Check chapters
    const chapters = await sql`
      SELECT COUNT(*) as count FROM chapters
    `;
    console.log(`\n📚 Chapters in database: ${chapters[0].count}`);

    // List first 3 chapters
    const sampleChapters = await sql`
      SELECT title, slug, "order" 
      FROM chapters 
      ORDER BY "order" 
      LIMIT 3
    `;
    console.log('\n📖 Sample chapters:');
    sampleChapters.forEach(c => console.log(`  ${c.order}. ${c.title} (${c.slug})`));

    console.log('\n✅ Database verification complete!');
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
  } finally {
    await sql.end();
  }
}

verifyDatabase();