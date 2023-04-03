import { Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly menuHeader: string;
    readonly backgroundContainer: string;
    readonly cardContainer: string;
    readonly dashboardGrid: string;
    readonly buzzContainer: string;
    homePageElements: any;


    constructor(page: Page) {
        this.page = page;
        this.menuHeader = `ul.oxd-main-menu`;
        this.backgroundContainer = 'div.orangehrm-background-container';
        this.cardContainer = 'div.orangehrm-card-container';
        this.buzzContainer = 'div.orangehrm-buzz-newsfeed';
        this.dashboardGrid = 'div.orangehrm-dashboard-grid';
    }

    // This function is used to select PIM Menu
    async clickPIMMenu() {
        await (await this.page.waitForSelector(this.menuHeader)).waitForElementState('stable');
        await this.page.getByRole('link', { name: 'PIM' }).click();
        await this.page.waitForSelector(this.backgroundContainer);
        await this.page.waitForTimeout(2000);
    };

    // This function is used to select Admin Menu
    async clickAdminMenu() {
        await (await this.page.waitForSelector(this.menuHeader)).waitForElementState('stable');
        await this.page.getByRole('link', { name: 'Admin' }).click();
        await this.page.waitForSelector(this.backgroundContainer);
        await this.page.waitForTimeout(2000);
    };

    // This function is used to select Maintenance Menu
    async clickMaintenanceMenu() {
        await (await this.page.waitForSelector(this.menuHeader)).waitForElementState('stable');
        await this.page.getByRole('link', { name: 'Maintenance' }).click();
        await this.page.waitForSelector(this.cardContainer);
        await this.page.waitForTimeout(2000);
    };

    // This function is used to select Buzz Menu
    async clickBuzzMenu() {
        await (await this.page.waitForSelector(this.menuHeader)).waitForElementState('stable');
        await this.page.getByRole('link', { name: 'Buzz' }).click();
        await this.page.waitForSelector(this.buzzContainer);
        await this.page.waitForTimeout(2000);
    };
}