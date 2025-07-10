# Supabase Connection String Guide

## Finding Your Connection String

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Click on "Settings" (gear icon) in the left sidebar
4. Click on "Database" under Configuration
5. You'll see several connection string options

## Connection String Formats

### For Prisma Migrations (Direct Connection)
Use the "Connection string" → "URI" format:
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

### Common Issues

1. **Wrong host format**: Make sure you're using the pooler URL, not the direct db.*.supabase.co URL
2. **Password encoding**: If your password contains special characters like @, #, $, etc., they need to be URL-encoded:
   - @ becomes %40
   - # becomes %23
   - $ becomes %24
   - ! becomes %21

3. **Port issues**: Always use port 5432 for direct connections

## Example with URL-encoded password

If your password is "Sam99sonite", it doesn't need encoding. But if it was "Sam@99#sonite", you'd use:
```
postgresql://postgres.uqfctrkkmbkqmkcqkuuw:Sam%4099%23sonite@aws-0-us-west-1.pooler.supabase.com:5432/postgres
```

## Testing Your Connection

You can test your connection string using psql:
```bash
psql "postgresql://postgres.uqfctrkkmbkqmkcqkuuw:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
```

Or use the migration script:
```bash
npx tsx scripts/migrate-to-supabase.ts
```