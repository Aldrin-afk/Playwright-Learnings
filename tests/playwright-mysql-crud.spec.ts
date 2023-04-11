import { test, expect } from '@playwright/test';
import mysql from 'mysql2/promise';
import sqlConfig from '../support/dbConfig';
import Constants from '../support/constants.json';

let connection: any;

test.beforeAll(async () => {
    // Connect to MySQL database
    connection = await mysql.createConnection(sqlConfig);
});

test.afterAll(async () => {
    // Close the database connection and browser
    await connection.end();
});

test.describe('MySQL Test', () => {
    test('Should read data from the table', async () => {
        // To execute data is read from the database
        const [rows] = await connection.execute('SELECT * FROM users');
        console.log('ROWs AVAILABLE:', rows);
        expect(rows).toEqual(Constants.CURDAssertions.read);
    });

    test('Should insert data into the table', async () => {
        // To execute data is inserted into the database
        const [rows] = await connection.execute('INSERT INTO users (email, password) VALUES (?, ?)', [Constants.valuesToInsert.email, Constants.valuesToInsert.password]);
        console.log('ROWs Inserted:', rows.affectedRows);
        expect(rows.affectedRows).toEqual(1);
    });

    test('Should verify data was inserted into the database', async () => {
        // To Verify that data was inserted into the database
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [Constants.valuesToVerify.email]);
        console.log('ROWs VERIFIED:', rows);
        expect(rows.length).toBe(1);
        expect(rows[0].email).toBe(Constants.valuesToVerify.email);
        expect(rows[0].password).toBe(Constants.valuesToVerify.password);
        expect(rows[0]).toEqual(Constants.CURDAssertions.push);
    });

    test('Should update data from the table', async () => {
        // To execute data is update from the database
        const [result] = await connection.execute(`UPDATE users SET password = 'Ahem@123' WHERE email = ?`, [Constants.valuesToDelete.email]);
        console.log('ROWs AFFECTED:', result.affectedRows);
        expect(result.affectedRows).toEqual(1);
    });

    test('Should delete updated data from the table', async () => {
        // To execute data is deleted from the updated database
        const [rows] = await connection.execute('DELETE FROM users WHERE password = ?', [Constants.valuesToDelete.paswordUpdated]);
        console.log('ROWs DELETED from UPDATED:', rows.affectedRows);
        expect(rows.affectedRows).toEqual(1);
    });

    test('Should delete data from the table', async () => {
        // To execute data is deleted from the database
        const [rows] = await connection.execute('DELETE FROM users WHERE email = ?', [Constants.valuesToDelete.email]);
        console.log('ROWs DELETED:', rows.affectedRows);
        expect(rows.affectedRows).toEqual(0);
    });
});