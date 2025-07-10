import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkSupabaseConnection() {
  console.log('🔍 Checking Supabase connection...');
  
  try {
    // Test the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Successfully connected to Supabase!');
    
    // Check if tables exist
    const tables = await prisma.$queryRaw<Array<{tablename: string}>>`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `;
    
    console.log('\n📋 Existing tables in database:');
    tables.forEach(t => console.log(`  - ${t.tablename}`));
    
    // Check expected tables
    const expectedTables = [
      'users',
      'sessions',
      'registration_approvals',
      'chapters',
      'sections',
      'user_activities',
      'user_progress',
      'user_annotations',
      'user_bookmarks',
      'daily_analytics',
      'content_performance'
    ];
    
    const existingTableNames = tables.map(t => t.tablename);
    const missingTables = expectedTables.filter(t => !existingTableNames.includes(t));
    
    if (missingTables.length > 0) {
      console.log('\n⚠️  Missing tables:', missingTables.join(', '));
      console.log('\n📝 Run the following commands to create the schema:');
      console.log('  1. npx prisma migrate dev --name init');
      console.log('  2. npx prisma db seed');
    } else {
      console.log('\n✅ All expected tables exist!');
      
      // Check if admin user exists
      const adminUser = await prisma.user.findUnique({
        where: { email: 'tiran@tirandagan.com' }
      });
      
      if (adminUser) {
        console.log('\n✅ Admin user exists:', adminUser.email);
      } else {
        console.log('\n⚠️  Admin user not found. Run: npx prisma db seed');
      }
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
    console.log('\n🔧 Make sure you have set the following environment variables:');
    console.log('  - DATABASE_URL (PostgreSQL connection string)');
    console.log('  - DIRECT_URL (Direct connection for migrations)');
  } finally {
    await prisma.$disconnect();
  }
}

// Run the check
checkSupabaseConnection();