import { expect, Page } from '@playwright/test';
import Constants from '../common/constants.json';


export class PracticeFormPO {
    readonly page: Page;
    subBtn: any;
    formHeaderResult: any;
    practiceFormBtn: any;
    userNameHeader: any;
    firstNameInputBox: any;
    lastNameInputBox: any;
    userEmailHeader: any;
    userEmailInputBox: any;
    genderHeader: any;
    maleRadioBtn: any;
    phNumHeader: any;
    phNumInputBox: any;
    dobHeader: any;
    dobInputBox: any;
    subHeader: any;
    subInputBox: any;
    hobbiesHeader: any;
    hobbiesInputBox: any;
    currAddress: any;
    currAddressTextArea: any;
    stateCityHeader: any;
    stateDropDown: any;
    cityDropDown: any;

    constructor(page: Page) {
        this.page = page;
        this.practiceFormBtn = this.page.locator(`//span[text()='Practice Form']`);
        this.genderHeader = this.page.locator(`div[id="genterWrapper"]`);
        this.maleRadioBtn = this.page.locator(`input[id="gender-radio-1"]`);
        this.phNumHeader = this.page.locator(`label[id="userNumber-label"]`);
        this.phNumInputBox = this.page.locator(`input[id="userNumber"]`);
        this.dobHeader = this.page.locator(`label[id="dateOfBirth-label"]`);
        this.dobInputBox = this.page.locator(`input[id="dateOfBirthInput"]`);
        this.subHeader = this.page.locator(`div[id="subjectsWrapper"] label[id="subjects-label"]`);
        this.subInputBox = this.page.locator(`input[id="subjectsInput"]`);
        this.hobbiesHeader = this.page.locator(`div[id="hobbiesWrapper"] label[id="subjects-label"]`);
        this.hobbiesInputBox = this.page.locator(`input[id="hobbies-checkbox-3"]`);
        this.stateCityHeader = this.page.locator(`label[id="stateCity-label"]`);
        this.stateDropDown = this.page.locator(`//div[@id='state']/div[1]/div[1]/div[1]`);
        this.cityDropDown = this.page.locator(`//div[@class='col-md-4 col-sm-12']/following-sibling::div[1]`);
        this.formHeaderResult = this.page.locator(`div[class="modal-title h4"]`);
        this.subBtn = this.page.locator(`button[id="submit"]`);

        this.userNameHeader = page.locator(`label[id="userName-label"]`);
        this.userEmailHeader = this.page.locator(`label[id="userEmail-label"]`);
        this.firstNameInputBox = this.page.locator(`input[id="firstName"]`);
        this.lastNameInputBox = this.page.locator(`input[id="lastName"]`);
        this.userNameHeader = page.locator(`label[id="userName-label"]`);
        this.userEmailHeader = this.page.locator(`label[id="userEmail-label"]`);
        this.userEmailInputBox = this.page.locator(`input[id="userEmail"]`);
        this.currAddress = this.page.locator(`label[id="currentAddress-label"]`);
        this.currAddressTextArea = this.page.locator(`textarea[id="currentAddress"]`);
    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }

    async clickPracticeFormBtn() {
        await this.practiceFormBtn.click();
    }

    async fillPracticeForm(filepath: any) {

        const fName = await this.userNameHeader.textContent();
        expect(fName).toContain('Name');
        await this.firstNameInputBox.fill(Constants.TestData.Fname);

        const lName = await this.userNameHeader.textContent();
        expect(lName).toContain('Name');
        await this.lastNameInputBox.fill(Constants.TestData.Lname);

        const email = await this.userEmailHeader.textContent();
        expect(email).toContain('Email');
        await this.userEmailInputBox.fill(Constants.TestData.Email);

        const gender = await this.genderHeader.textContent();
        expect(gender).toContain('Gender');
        await this.maleRadioBtn.click({ force: true });
        await this.maleRadioBtn.isChecked();

        const phnum = await this.phNumHeader.textContent();
        expect(phnum).toContain('Mobile(10 Digits)');
        await this.phNumInputBox.fill(Constants.TestData.PhNum);

        const dob = await this.dobHeader.textContent();
        expect(dob).toContain('Date of Birth');
        // await this.dobInputBox.clear();
        await this.page.waitForTimeout(1000);
        // await this.dobInputBox.fill(Constants.TestData.Dob);

        const sub = await this.subHeader.textContent();
        expect(sub).toContain('Subjects');
        await this.subInputBox.type(Constants.TestData.Subject);
        await this.subInputBox.press('Enter');

        const hobbies = await this.hobbiesHeader.textContent();
        expect(hobbies).toContain('Hobbies');
        await this.hobbiesInputBox.click({ force: true });
        await this.hobbiesInputBox.isChecked();

        await this.page.setInputFiles("input[type='file']", [filepath]);
        await this.page.waitForTimeout(5000);

        const address = await this.currAddress.textContent();
        expect(address).toContain('Address');
        await this.currAddressTextArea.fill(Constants.TestData.currentAddress);
        await this.page.waitForTimeout(3000);

        // const state = await this.stateCityHeader.textContent();
        // expect(state).toContain('State and City');
        // await this.stateDropDown.type(Constants.TestData.State);
        // await this.stateDropDown.selectOption(Constants.TestData.State);
        // await this.subInputBox.press('Enter');
        // await this.page.waitForTimeout(3000);
        // const city = await this.stateCityHeader.textContent();
        // expect(city).toContain('State and City');
        // await this.cityDropDown.type(Constants.TestData.City);
        // await this.cityDropDown.selectOption(Constants.TestData.City);
        // await this.subInputBox.press('Enter');

    };

    async formResult() {
        return await this.formHeaderResult.allTextContents();
    }

    async submitButton() {
        await this.subBtn.click();
    }
}