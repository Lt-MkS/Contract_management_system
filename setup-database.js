const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  // First, create the database
  const adminClient = new Client({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'postgres', // Connect to default postgres database first
  });

  try {
    console.log('Connecting to PostgreSQL...');
    await adminClient.connect();
    console.log('✓ Connected to PostgreSQL');

    // Create database
    console.log('Creating contract_db database...');
    try {
      await adminClient.query('CREATE DATABASE contract_db');
      console.log('✓ Database contract_db created');
    } catch (err) {
      if (err.code === '42P04') {
        console.log('✓ Database contract_db already exists');
      } else {
        throw err;
      }
    }

    await adminClient.end();

    // Now connect to the new database and run init script
    const dbClient = new Client({
      user: 'postgres',
      password: 'password',
      host: 'localhost',
      port: 5432,
      database: 'contract_db',
    });

    console.log('Connecting to contract_db...');
    await dbClient.connect();
    console.log('✓ Connected to contract_db');

    // Read and execute init-db.sql
    const sqlPath = path.join(__dirname, 'backend', 'src', 'config', 'init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Initializing database schema...');
    await dbClient.query(sql);
    console.log('✓ Database schema initialized successfully');

    // Verify tables
    const result = await dbClient.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename IN ('blueprints', 'contracts')
    `);

    if (result.rows.length === 2) {
      console.log('✓ Both blueprints and contracts tables are present');
    }

    await dbClient.end();
    console.log('\n✓ Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
