import { expect, Locator, Page } from '@playwright/test';
import Constants from '../common/constants.json';

export class WebTablesPO {
    readonly page: Page;
    webTableBtn: Locator;
    addNewRecord: Locator;
    firstNameHeader: Locator;
    lastNameHeader: Locator;
    ageHeader: Locator;
    salaryHeader: Locator;
    departmentHeader: Locator;
    firstNameInputBox: Locator;
    lastNameInputBox: Locator;
    ageInputBox: Locator;
    salaryInputBox: Locator;
    departmentInputBox: Locator;
    searchBox: Locator;
    tableRow: Locator;
    userEmailHeader: any;
    userEmailInputBox: any;
    subBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.webTableBtn = this.page.locator(`//span[text()='Web Tables']`);
        this.addNewRecord = this.page.locator(`button[id="addNewRecordButton"]`);
        this.firstNameHeader = this.page.locator(`label[id="firstName-label"]`);
        this.lastNameHeader = this.page.locator(`label[id="lastName-label"]`);
        this.userEmailHeader = this.page.locator(`label[id="userEmail-label"]`);
        this.ageHeader = this.page.locator(`label[id="age-label"]`);
        this.salaryHeader = this.page.locator(`label[id="salary-label"]`);
        this.departmentHeader = this.page.locator(`label[id="department-label"]`);
        this.firstNameInputBox = this.page.locator(`input[id="firstName"]`);
        this.lastNameInputBox = this.page.locator(`input[id="lastName"]`);
        this.userEmailInputBox = this.page.locator(`input[id="userEmail"]`);
        this.ageInputBox = this.page.locator(`input[id="age"]`);
        this.salaryInputBox = this.page.locator(`input[id="salary"]`);
        this.departmentInputBox = this.page.locator(`input[id="department"]`);
        this.searchBox = this.page.locator(`input[id="searchBox"]`);
        this.tableRow = this.page.locator('div[role="rowgroup"] div[class="rt-tr -odd"]');
        this.subBtn = this.page.locator(`button[id="submit"]`);

    }
    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickWebTableBtn() {
        await this.webTableBtn.click();
    }

    async clickAddRecordBtn() {
        await this.addNewRecord.click();
    }

    async fillRegForm(firstName: string, lastName: string, eMail: string, ageToFill: string, salaryToFill: string, departmentToFill: string) {
        const fName = await this.firstNameHeader.textContent();
        expect(fName).toBe('First Name');
        await this.firstNameInputBox.fill(firstName);

        const lName = await this.lastNameHeader.textContent();
        expect(lName).toBe('Last Name');
        await this.lastNameInputBox.fill(lastName);

        const email = await this.userEmailHeader.textContent();
        expect(email).toBe('Email');
        await this.userEmailInputBox.fill(eMail);

        const age = await this.ageHeader.textContent();
        expect(age).toBe('Age');
        await this.ageInputBox.fill(ageToFill);

        const salary = await this.salaryHeader.textContent();
        expect(salary).toBe('Salary');
        await this.salaryInputBox.fill(salaryToFill);

        const department = await this.departmentHeader.textContent();
        expect(department).toBe('Department');
        await this.departmentInputBox.fill(departmentToFill);
    }

    async fillSearchBox(firstName) {
        await this.searchBox.fill(firstName);
    }

    async verifyTableByFilter(verifyTable) {
        await expect(this.tableRow).toContainText(verifyTable);
    }

    async submitButton() {
        await this.subBtn.click();
    }

}