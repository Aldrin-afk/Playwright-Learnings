import { test, chromium, expect } from '@playwright/test';
import mysql from 'mysql2/promise';

let browser: any;
let page: any;
let connection: any;

test.beforeAll(async () => {
    // Launch browser and create a new page
    browser = await chromium.launch();
    page = await browser.newPage();

    // Connect to MySQL database
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin@123',
        database: 'test_db'
    });
});

test.afterAll(async () => {
    // Close the database connection and browser
    await connection.end();
    await browser.close();
});

test.describe('MySQL Test', () => {
    test('Should verify data from the table', async () => {

        // Verify that data was inserted into the database
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', ['johndoe@example.com']);
        console.log(rows);
        expect(rows.length).toBe(1);
        expect(rows[0].email).toBe('johndoe@example.com');
        expect(rows[0].password).toBe('Hello@123');
    });
});
