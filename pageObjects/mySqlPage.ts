import { Page } from "@playwright/test";
let connection: any;

export class MySQLPage {
    readonly page: Page;
    readonly homePageElements: any;

    constructor(page: Page) {
        this.page = page;
    }
}

// This function is used to select Buzz Menu
async function createDb(data: any) {
    const [rows] = await connection.execute(
        'INSERT INTO mytable (field1, field2, field3) VALUES (?, ?, ?)',
        [data.field1, data.field2, data.field3]
    );
    return rows.insertId;
}

async function readDb(id: number) {
    const [rows] = await connection.execute(
        'SELECT * FROM mytable WHERE id = ?',
        [id]
    );
    return rows[0];
}

async function updateDb(id: number, data: any) {
    await connection.execute(
        'UPDATE mytable SET field1 = ?, field2 = ?, field3 = ? WHERE id = ?',
        [data.field1, data.field2, data.field3, id]
    );
}

async function deleteDb(id: number) {
    await connection.execute(
        'DELETE FROM mytable WHERE id = ?',
        [id]
    );
}