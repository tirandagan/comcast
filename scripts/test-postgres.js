require('dotenv').config();

console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^@]+@/, ':****@'));

// Test with postgres.js
const postgres = require('postgres');

async function test() {
  try {
    console.log('\nTrying to connect...');
    const sql = postgres(process.env.DATABASE_URL, {
      ssl: 'require',
      connection: {
        options: `-c search_path=public`
      }
    });
    
    const result = await sql`SELECT NOW() as time`;
    console.log('✅ Connected! Server time:', result[0].time);
    
    await sql.end();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    // Try to parse the connection string
    try {
      const url = new URL(process.env.DATABASE_URL);
      console.log('\nConnection details:');
      console.log('- Host:', url.hostname);
      console.log('- Port:', url.port);
      console.log('- Database:', url.pathname.slice(1));
      console.log('- Username:', url.username);
    } catch (e) {
      console.error('Invalid DATABASE_URL format');
    }
  }
}

test();