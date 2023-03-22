import { Page, expect, Locator } from "@playwright/test";
import Constants from '../support/constants.json';

export class AdminPage {
    readonly page: Page;
    container: string;
    adminHeadersLocators: any;
    userManagementLocators: any;
    actionButton: string;
    edit: string;
    tableRow: string;
    recordsCount: string;
    jobLocators: any;
    browseButton: string;
    uploadElement: string;
    upload: string;
    toastMessage: string;
    closeIcon: string;
    cancel: string;
    noRecordsText: string;
    note: string;
    confirmationPopup: any;
    popupText: string;
    popupDeleteButton: string;
    payGradeLocators: any;
    empStatusLocators: any;
    jobCatLocators: any;
    workShiftsLocators: any;
    organizationLocators: any;
    locationsLocator: any;
    structureLocator: any;
    popupStructureDeleteButton: string;

    constructor(page: Page) {
        this.page = page;
        this.container = `.orangehrm-background-container`;
        this.actionButton = `button.oxd-button--medium`;
        this.tableRow = `div.oxd-table-card`;
        this.recordsCount = `(//span[@class='oxd-text oxd-text--span'])[1]`;
        this.browseButton = '//div[text()="Browse"]';
        this.uploadElement = '.oxd-file-input';
        this.upload = `//div[@class='oxd-file-div oxd-file-div--active']//i[1]`;
        this.toastMessage = 'p.oxd-text--toast-message';
        this.closeIcon = '.oxd-toast-close-container';
        this.cancel = '.oxd-form-actions button[type="button"]';
        this.noRecordsText = '.orangehrm-horizontal-padding .oxd-text.oxd-text--span';
        this.note = `//label[text()='Note']/following::textarea`;
        this.confirmationPopup = 'div.orangehrm-dialog-popup';
        this.popupText = 'p.oxd-text--card-body';
        this.popupDeleteButton = '(//div[@class="-modal-footer"]//button)[2]';
        this.popupStructureDeleteButton = '(//div[@class="orangehrm-modal-footer"]//button)[2]';

        this.adminHeadersLocators = {
            userManagementMenu: `//span[text()='User Management ']`,
            userDropDownMenu: '//span[text()="User Management "]/..//ul[@class="oxd-dropdown-menu"]',

            jobMenu: `//span[text()='Job ']`,
            jobTitlesDropDownMenu: '//span[text()="Job "]/..//ul[@class="oxd-dropdown-menu"]/..//a[text()="Job Titles"]',
            payGradesDropDownMenu: '//span[text()="Job "]/..//ul[@class="oxd-dropdown-menu"]/..//a[text()="Pay Grades"]',
            employeeStatusDropDownMenu: '//span[text()="Job "]/..//ul[@class="oxd-dropdown-menu"]/..//a[text()="Employment Status"]',
            jobCategoriesDropDownMenu: '//span[text()="Job "]/..//ul[@class="oxd-dropdown-menu"]/..//a[text()="Job Categories"]',
            workShiftsDropDownMenu: '//span[text()="Job "]/..//ul[@class="oxd-dropdown-menu"]/..//a[text()="Work Shifts"]',

            organizationMenu: `//span[text()='Organization ']`,
            generalInfoDropDownMenu: `//span[text()="Organization "]/..//ul[@class="oxd-dropdown-menu"]/..//a[text()="General Information"]`,
            locationsDropDownMenu: `//span[text()="Organization "]/..//ul[@class="oxd-dropdown-menu"]/..//a[text()="Locations"]`,
            structureDropDownMenu: `//span[text()="Organization "]/..//ul[@class="oxd-dropdown-menu"]/..//a[text()="Structure"]`

        }
        this.userManagementLocators = {
            userName: `//label[text()="Username"]/../..//div/input`,
            userRole: `//label[text()="User Role"]/../../..//div[@class="oxd-select-text--after"]`,
            employeeName: `//label[text()="Employee Name"]/../..//div/input`,
            status: `//label[text()="Status"]/../../..//div[@class="oxd-select-text--after"]`
        }
        this.jobLocators = {
            jobTitle: `//label[text()="Job Title"]/../..//div/input`,
            jobDescription: `(//textarea[contains(@class,'oxd-textarea')])[1]`,
        }
        this.payGradeLocators = {
            payGradeName: `//label[text()="Name"]/../..//div/input`,
            currency: `//label[text()="Currency"]/../../..//div[@class="oxd-select-text--after"]`,
            minSalary: `//label[text()="Minimum Salary"]/../..//div/input`,
            maxSalary: `//label[text()="Maximum Salary"]/../..//div/input`
        }
        this.empStatusLocators = {
            empStatusName: `//label[text()="Name"]/../..//div/input`
        }
        this.jobCatLocators = {
            jobCatName: `//label[text()="Name"]/../..//div/input`
        }
        this.workShiftsLocators = {
            shiftName: `//label[text()="Shift Name"]/../..//div/input`,
            fromTime: `//label[text()='From']/../..//div/input`,
            toTime: `//label[text()='To']/../..//div/input`,
            assignedEmployees: `//label[text()='Assigned Employees']/../..//div/input`
        }
        this.organizationLocators = {
            editSwitch: `//input[@type='checkbox']/..//span`,
            orgName: `//label[text()="Organization Name"]/../..//div/input`,
            regNumber: `//label[text()="Registration Number"]/../..//div/input`,
            taxID: `//label[text()="Tax ID"]/../..//div/input`,
            phone: `//label[text()="Phone"]/../..//div/input`,
            fax: `//label[text()="Fax"]/../..//div/input`,
            email: `//label[text()="Email"]/../..//div/input`,
            adrStreet1: `//label[text()="Address Street 1"]/../..//div/input`,
            adrStreet2: `//label[text()="Address Street 2"]/../..//div/input`,
            city: `//label[text()="City"]/../..//div/input`,
            state: `//label[text()="State/Province"]/../..//div/input`,
            zipCode: `//label[text()="Zip/Postal Code"]/../..//div/input`,
            country: `//label[text()="Country"]/../../..//div[@class="oxd-select-text--after"]`,
            notes: `//label[text()='Notes']/following::textarea`
        }
        this.locationsLocator = {
            name: `//label[text()="Name"]/../..//div/input`,
            city: `//label[text()="City"]/../..//div/input`,
            country: `//label[text()="Country"]/../../..//div[@class="oxd-select-text--after"]`,
            state: `//label[text()="State/Province"]/../..//div/input`,
            zipCode: `//label[text()="Zip/Postal Code"]/../..//div/input`,
            phone: `//label[text()="Phone"]/../..//div/input`,
            fax: `//label[text()="Fax"]/../..//div/input`,
            address: `//label[text()='Address']/following::textarea[1]`,
            notes: `//label[text()='Notes']/following::textarea`,
            note: `//label[text()='Note']/following::textarea`
        }
        this.structureLocator = {
            unitID: `//label[text()="Unit Id"]/../..//div/input`,
            name: `//label[text()="Name"]/../..//div/input`,
            description: `//label[text()='Description']/following::textarea`
        }
        this.edit = `//i[@class='oxd-icon bi-pencil-fill']`;
    };

    async clickMenu(locator: any, menuLink: string) {
        await this.page.waitForSelector(locator);
        await this.page.getByRole('button', { name: menuLink }).click();
        await this.page.waitForSelector(this.container);
        await this.page.waitForTimeout(5000);
    };

    async clickHeaderMenu(locator: string) {
        await this.page.waitForSelector(locator);
        await this.page.locator(locator).click();
        await this.page.waitForSelector(this.container);
        await this.page.waitForTimeout(5000);
    };

    async click(locator: any) {
        await this.page.locator(locator).click({ force: true });
    };

    async clickSave(locatorValue: string, index: number, messageToVerify?: string) {
        await this.page.locator(locatorValue).nth(index).click();
        expect(await this.getToastMessage()).toEqual(messageToVerify);
        await this.clickCloseIcon();
    };

    async clearTextBoxValues(locatorValue: any) {
        await this.page.locator(locatorValue).clear();
        await this.page.waitForTimeout(1000);
    };

    async fillTextBoxValues(locatorValue: any, fillValue: any) {
        await this.page.locator(locatorValue).clear();
        await (await this.page.waitForSelector(locatorValue)).waitForElementState("stable");
        await this.page.locator(locatorValue).type(fillValue);
    };

    async fillFieldValues(namesLocators: any, values: any) {
        for (const locator of namesLocators) {
            await this.clearTextBoxValues(locator);
            const index = namesLocators.indexOf(locator);
            await this.fillTextBoxValues(locator, values[index]);
            await this.page.waitForTimeout(3000);
        };
    };

    async clickElementWithIndex(locatorValue: string, index: number) {
        await this.page.locator(locatorValue).nth(index).click();
    };

    async selecDropdownOption(locator: any, optionValue: any) {
        await this.click(locator);
        await this.page.getByRole('option', { name: optionValue }).getByText(optionValue, { exact: true }).first().click();
    };

    async getToastMessage() {
        return await this.page.locator(this.toastMessage).textContent();
    };

    async clickCloseIcon() {
        await this.page.locator(this.closeIcon).click();
    };

    async jobuploadFile(filePath: any, value: boolean) {
        await this.click(this.browseButton);
        await this.page.setInputFiles(this.uploadElement, filePath);
        await this.page.waitForTimeout(3000);
        if (value) {
            await this.page.locator(this.upload).last().click();
            await this.clickCloseIcon();
        }
        else {
            await this.click(this.cancel);
            await this.page.waitForSelector(this.noRecordsText);
        }
    };

    async editRow(fillName: any) {
        this.page.locator(`//div[text()='${fillName}']/../..//i[@class='oxd-icon bi-pencil-fill']`).click();
    };

    async editRowStructure(fillName: any) {
        this.page.locator(`//div[contains(text(), '${fillName}')]/../..//i[@class='oxd-icon bi-pencil-fill']`).click();
    };

    async addSubRowStructure(fillName: any) {
        this.page.locator(`//div[contains(text(), '${fillName}')]/../..//i[@class='oxd-icon bi-plus']`).click();
    };

    async deleteStructure(fillName: any) {
        this.page.locator(`//div[contains(text(), '${fillName}')]/../..//i[@class='oxd-icon bi-trash-fill']`).click();
        await this.page.waitForSelector(this.confirmationPopup);
        expect(await this.page.locator(this.popupText).textContent()).toEqual(Constants.popupText.text);
        await this.page.locator(this.popupStructureDeleteButton).click();
        expect(this.page.locator(this.tableRow).first()).not.toBeVisible();
    };

    async deleteFileRecord(confirmation: string, fillName: string) {
        if (confirmation == "cancel") {
            this.page.locator(`//div[text()='${fillName}']/../..//i[@class='oxd-icon bi-trash']`).first().click();
            await this.page.waitForSelector(this.confirmationPopup);
            expect(await this.page.locator(this.popupText).textContent()).toEqual(Constants.popupText.text);
            await this.page.getByRole('button', { name: /^\s*No, Cancel\s*$/i }).click();
            expect(this.page.locator(this.tableRow).first()).toBeVisible();
        }
        else {
            this.page.locator(`//div[text()='${fillName}']/../..//i[@class='oxd-icon bi-trash']`).first().click();
            await this.page.waitForSelector(this.confirmationPopup);
            expect(await this.page.locator(this.popupText).textContent()).toEqual(Constants.popupText.text);
            await this.page.locator(this.popupDeleteButton).click();
            expect(this.page.locator(this.tableRow).first()).not.toBeVisible();
        }
    };

    async fillDateValue(locatorValue: any, fillValue: any) {
        await this.page.locator(locatorValue).fill(fillValue);
    };
}