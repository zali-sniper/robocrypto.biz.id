
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('Checking for data in users table...');
        const res = await pool.query('SELECT count(*) FROM users');
        console.log(`Total rows in users: ${res.rows[0].count}`);

        if (res.rows[0].count > 0) {
            const sample = await pool.query('SELECT * FROM users LIMIT 1');
            console.log('Sample row:');
            console.log(sample.rows[0]);
        }
    } catch (error) {
        console.error('Check failed:', error);
    } finally {
        await pool.end();
    }
}

main();
