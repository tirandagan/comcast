import postgres from 'postgres';

// Create a single instance of the postgres client
const sql = postgres(process.env.DATABASE_URL!, {
  // Connection pool settings
  max: 10, // Maximum number of connections
  idle_timeout: 20,
  connect_timeout: 10,
  
  // SSL settings for Supabase
  ssl: 'require',
  
  // Transform JS dates to PostgreSQL timestamps
  transform: {
    undefined: null,
  },
  
  // Debug in development
  debug: process.env.NODE_ENV === 'development' ? console.log : undefined,
});

export default sql;

// Helper function to check connection
export async function checkConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connected:', result[0].current_time);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}