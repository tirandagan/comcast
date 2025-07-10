const { Client } = require('pg');

async function testConnection() {
  console.log('Testing Supabase connection...\n');
  
  // Parse the connection string from environment
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found in environment variables');
    return;
  }
  
  console.log('📍 Connection string:', connectionString.replace(/:[^@]+@/, ':****@'));
  
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  try {
    await client.connect();
    console.log('✅ Successfully connected to Supabase!');
    
    const result = await client.query('SELECT NOW()');
    console.log('⏰ Server time:', result.rows[0].now);
    
    await client.end();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    
    if (err.message.includes("password authentication failed")) {
      console.log('\n🔑 This means the password is incorrect.');
      console.log('   The Supabase database password is NOT "Sam99sonite".');
      console.log('   You need the auto-generated password from your Supabase dashboard.\n');
      console.log('📝 To find your database password:');
      console.log('   1. Go to https://app.supabase.com');
      console.log('   2. Select your project');
      console.log('   3. Go to Settings → Database');
      console.log('   4. Look for "Database Password" (it\'s a long random string)');
      console.log('   5. Or reset it if you don\'t know it');
    }
  }
}

testConnection();