import { expect, Locator, Page } from '@playwright/test';
import Constants from '../common/constants.json';


export class ElementsPO {
    readonly page: Page;
    userName: Locator;
    userNameinput: Locator;
    textBoxBtn: Locator;
    userNameHeader: Locator;
    userNameInputBox: Locator;
    userEmailHeader: Locator;
    userEmailInputBox: Locator;
    currAddress: Locator;
    currAddressTextArea: Locator;
    permAddress: Locator;
    subBtn: Locator;
    result: Locator;
    checkBox: Locator;
    checkBoxBtn: Locator;
    expandBtn: Locator;
    collapseBtn: Locator;
    toggleBtn: Locator;
    radioButBtn: Locator;
    radioButHeader: Locator;
    yesRadioBtn: Locator;
    impressiveRadioBtn: Locator;
    noRadioButton: Locator;
    radioResultText: Locator;
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
    webTableBtn: Locator;
    addNewRecord: Locator;
    searchBox: Locator;
    tableRow: Locator;
    permAddressTextArea: Locator;
    result1: Locator;
    buttonsBtn: Locator;
    doubleClickBtn: Locator;
    rightClickBtn: Locator;
    clickMeBtn: Locator;
    doubleClickMessage: Locator;
    rightClickMessage: Locator;
    dynamicClickMessage: Locator;
    linksBtn: Locator;
    createAPI: Locator;
    noContentAPI: Locator;
    movedAPI: Locator;
    badReqAPI: Locator;
    unAuthAPI: Locator;
    forbiddenAPI: Locator;
    notFoundAPI: Locator;
    linkResult: Locator;
    homeUrlBtn: Locator;
    homeUrlBtn2: Locator;
    updownBtn: Locator;
    downloadBtn: Locator;
    practiceFormBtn: Locator;
    genderHeader: any;
    maleRadioBtn: Locator;
    phNumHeader: Locator;
    phNumInputBox: Locator;
    dobHeader: Locator;
    dobInputBox: Locator;
    subHeader: Locator;
    subInputBox: Locator;
    hobbiesHeader: Locator;
    hobbiesInputBox: Locator;
    stateCityHeader: Locator;
    stateDropDown: Locator;
    cityDropDown: Locator;
    formHeaderResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator(`label[id="userName-label"]`);
        this.userNameinput = page.locator(`input[id="userName"]`);
        this.textBoxBtn = page.locator(`//span[text()='Text Box']`);
        this.userNameHeader = page.locator(`label[id="userName-label"]`);
        this.userNameInputBox = page.locator(`input[id="userName"]`);
        this.userEmailHeader = this.page.locator(`label[id="userEmail-label"]`);
        this.userEmailInputBox = this.page.locator(`input[id="userEmail"]`);
        this.currAddress = this.page.locator(`label[id="currentAddress-label"]`);
        this.currAddressTextArea = this.page.locator(`textarea[id="currentAddress"]`);
        this.permAddress = this.page.locator(`label[id="permanentAddress-label"]`);
        this.permAddressTextArea = this.page.locator(`textarea[id="permanentAddress"]`);
        this.subBtn = this.page.locator(`button[id="submit"]`);
        this.result = this.page.locator(`div[id="output"]`);

        this.checkBoxBtn = this.page.locator(`//span[text()='Check Box']`);
        this.checkBox = this.page.locator(`span[class="rct-checkbox"]`);
        this.expandBtn = this.page.locator(`button[title="Expand all"]`);
        this.collapseBtn = this.page.locator(`button[title="Collapse all"]`);
        this.toggleBtn = this.page.locator(`button[title="Toggle"]`);
        this.result1 = this.page.locator(`div[id="result"]`);

        this.radioButBtn = this.page.locator(`//span[text()='Radio Button']`);
        this.radioButHeader = this.page.locator(`div[class="mb-3"]`);
        this.yesRadioBtn = this.page.locator(`input[id="yesRadio"]`);
        this.impressiveRadioBtn = this.page.locator(`input[id="impressiveRadio"]`);
        this.noRadioButton = this.page.locator(`input[id="noRadio"]`);
        this.radioResultText = this.page.locator(`span.text-success`);

        this.webTableBtn = this.page.locator(`//span[text()='Web Tables']`);
        this.addNewRecord = this.page.locator(`button[id="addNewRecordButton"]`);
        this.firstNameHeader = this.page.locator(`label[id="firstName-label"]`);
        this.lastNameHeader = this.page.locator(`label[id="lastName-label"]`);
        this.ageHeader = this.page.locator(`label[id="age-label"]`);
        this.salaryHeader = this.page.locator(`label[id="salary-label"]`);
        this.departmentHeader = this.page.locator(`label[id="department-label"]`);
        this.firstNameInputBox = this.page.locator(`input[id="firstName"]`);
        this.lastNameInputBox = this.page.locator(`input[id="lastName"]`);
        this.ageInputBox = this.page.locator(`input[id="age"]`);
        this.salaryInputBox = this.page.locator(`input[id="salary"]`);
        this.departmentInputBox = this.page.locator(`input[id="department"]`);
        this.searchBox = this.page.locator(`input[id="searchBox"]`);
        this.tableRow = this.page.locator('div[role="rowgroup"] div[class="rt-tr -odd"]');

        this.buttonsBtn = this.page.locator(`//span[text()='Buttons']`);
        this.doubleClickBtn = this.page.locator(`button[id="doubleClickBtn"]`);
        this.rightClickBtn = this.page.locator(`button[id="rightClickBtn"]`);
        this.clickMeBtn = this.page.locator(`//button[text()='Click Me']`);
        this.doubleClickMessage = this.page.locator(`p#doubleClickMessage`);
        this.rightClickMessage = this.page.locator(`p#rightClickMessage`);
        this.dynamicClickMessage = this.page.locator(`p#dynamicClickMessage`);

        this.linksBtn = this.page.locator(`//span[text()='Links']`);
        this.createAPI = this.page.locator(`a#created`);
        this.noContentAPI = this.page.locator(`a#no-content`);
        this.movedAPI = this.page.locator(`a#moved`);
        this.badReqAPI = this.page.locator(`a#bad-request`);
        this.unAuthAPI = this.page.locator(`a#unauthorized`);
        this.forbiddenAPI = this.page.locator(`a#forbidden`);
        this.notFoundAPI = this.page.locator(`a#invalid-url`);
        this.linkResult = this.page.locator(`p#linkResponse`);
        this.homeUrlBtn = this.page.locator(`a#simpleLink`);
        this.homeUrlBtn2 = this.page.locator(`a#dynamicLink`);

        this.updownBtn = this.page.locator(`//span[text()='Upload and Download']`);
        this.downloadBtn = this.page.locator("a#downloadButton");

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

    }

    async baseURL() {
        await this.page.goto(Constants.homePageURL);
    }
    async clickTextBoxBtn() {
        await this.textBoxBtn.click();
    }
    async fillFullName(name: string) {
        const username = await this.userNameHeader.textContent();
        expect(username).toContain('Full Name');
        await this.userNameInputBox.fill(name);
    }
    async fillEmail(email: string) {
        const emailheader = await this.userEmailHeader.textContent();
        expect(emailheader).toContain('Email');
        await this.userEmailInputBox.fill(email);
    }
    async fillCurrAddress(currAdrs: string) {
        const address = await this.currAddress.textContent();
        expect(address).toContain('Current Address');
        await this.currAddressTextArea.type(currAdrs);
    }
    async fillPermAddress(permAdrs: string) {
        const peraddress = await this.permAddress.textContent();
        expect(peraddress).toContain('Permanent Address');
        await this.permAddressTextArea.fill(permAdrs);
    }
    async submitButton() {
        await this.subBtn.click();
    }
    async textResult() {
        return await this.result.allTextContents();
    }

    //////////////

    async clickCheckBoxBtn() {
        await this.checkBoxBtn.click();
    }
    async clickHomeCheckBox() {
        await this.checkBox.click();
    }
    async dispResult() {
        return await this.result1.textContent();
    }
    async clickExpandBtn() {
        await this.expandBtn.click();
    }
    async clickCollapseBtn() {
        await this.collapseBtn.click();
    }
    async clickToggleBtn() {
        await this.toggleBtn.nth(0).click();
    }

    //////////////

    async clickRadioButtonBtn() {
        await this.radioButBtn.click();
    }
    async radioBtnHeader() {
        return await this.radioButHeader.allTextContents();
    }
    async clickYesRadioBtn() {
        await this.yesRadioBtn.click({ force: true });
        const radioButton = this.yesRadioBtn;
        const isRadioButtonEnabled = await radioButton.isEnabled();
        const isRadioButtonClickable = await radioButton.isChecked();

        if (!isRadioButtonEnabled) {
            console.log('Radio button is disabled and cannot be checked.');
        } else if (!isRadioButtonClickable) {
            console.log('Radio button is enabled but not checked.');
        } else {
            console.log('Radio button is enabled and checked.');
        }
    }

    async clickImpressiveRadioBtn() {
        await this.impressiveRadioBtn.click({ force: true });
        const radioButton = this.impressiveRadioBtn;
        const isRadioButtonEnabled = await radioButton.isEnabled();
        const isRadioButtonClickable = await radioButton.isChecked();

        if (!isRadioButtonEnabled) {
            console.log('Radio button is disabled and cannot be checked.');
        } else if (!isRadioButtonClickable) {
            console.log('Radio button is enabled but not checked.');
        } else {
            console.log('Radio button is enabled and checked.');
        }
    }
    async noRadioBtn() {
        const radioButton = this.noRadioButton;
        const isRadioButtonEnabled = await radioButton.isEnabled();
        const isRadioButtonClickable = await radioButton.isChecked();

        if (!isRadioButtonEnabled) {
            console.log('Radio button is disabled and cannot be checked.');
        } else if (!isRadioButtonClickable) {
            console.log('Radio button is enabled but not checked.');
        } else {
            console.log('Radio button is enabled and checked.');
        }
    }
    async radioResult() {
        return await this.radioResultText.allTextContents();
    }

    //////////////

    async clickWebTableBtn() {
        await this.webTableBtn.click();
    }
    async clickAddRecordBtn() {
        await this.addNewRecord.click();
    }
    async fillRegForm() {
        const fName = await this.firstNameHeader.textContent();
        expect(fName).toBe('First Name');
        await this.firstNameInputBox.fill(Constants.TestData.Fname);

        const lName = await this.lastNameHeader.textContent();
        expect(lName).toBe('Last Name');
        await this.lastNameInputBox.fill(Constants.TestData.Lname);

        const email = await this.userEmailHeader.textContent();
        expect(email).toBe('Email');
        await this.userEmailInputBox.fill(Constants.TestData.Email);

        const age = await this.ageHeader.textContent();
        expect(age).toBe('Age');
        await this.ageInputBox.fill(Constants.TestData.age);

        const salary = await this.salaryHeader.textContent();
        expect(salary).toBe('Salary');
        await this.salaryInputBox.fill(Constants.TestData.salary);

        const department = await this.departmentHeader.textContent();
        expect(department).toBe('Department');
        await this.departmentInputBox.fill(Constants.TestData.department);
    }
    async fillSearchBox() {
        await this.searchBox.fill(Constants.TestData.Fname);
    }
    async verifyTableByFilter() {
        await expect(this.tableRow).toContainText(Constants.TestData.verifyTable);
    }

    //////////////

    async clickRadioBtn() {
        await this.buttonsBtn.click();
    }
    async clickDoubleClickBtn() {
        await this.doubleClickBtn.dblclick();
    }
    async clickRightClickBtn() {
        await this.rightClickBtn.click({ button: 'right' });
    }
    async clickMeButtonBtn() {
        await this.clickMeBtn.click();
    }
    async dbButtonResult() {
        return await this.doubleClickMessage.allTextContents();
    }
    async rbuttonResult() {
        return await this.rightClickMessage.allTextContents();
    }
    async dynbuttonResult() {
        return await this.dynamicClickMessage.allTextContents();
    }

    //////////////

    async clickLinksBtn() {
        await this.linksBtn.click();
    }
    async clickcreatedAPI() {
        await this.createAPI.click();
    }
    async clicknoContentAPI() {
        await this.noContentAPI.click();
    }
    async clickmovedAPI() {
        await this.movedAPI.click();
    }
    async clickbadReqAPI() {
        await this.badReqAPI.click();
    }
    async clickunAuthorizedAPI() {
        await this.unAuthAPI.click();
    }
    async clickforbiddenAPI() {
        await this.forbiddenAPI.click();
    }
    async clicknotFoundAPI() {
        await this.notFoundAPI.click();
    }
    async linkResponse() {
        return await this.linkResult.allInnerTexts();
    }
    async clickHomePageBtn() {
        await this.homeUrlBtn.click();
    }
    async clickHomePageDynBtn() {
        await this.homeUrlBtn2.click();
    }

    //////////////

    async clickUploadDownloadBtn() {
        await this.updownBtn.click();
    }
    async clickDownloadBtn() {
        await this.downloadBtn.click();
    }

    //////////////

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

    //////////////

    async clickBrokenLinksImageBtn() {
        await this.page.locator(`//span[text()='Broken Links - Images']`).click();
    }
    async clickValidLink() {
        await this.page.locator(`//a[contains(text(),'Click Here for Valid Link')]`).click();
    }
    async clickBrokenLink() {
        await this.page.locator(`//a[contains(text(),'Click Here for Broken Link')]`).click();
    }
    async validLinkHeader() {
        return await this.page.locator(`//p[text()='Valid Link']`).textContent();
    }
    async brokenLinkHeader() {
        return await this.page.locator(`//p[text()='Broken Link']`).textContent();
    }
};