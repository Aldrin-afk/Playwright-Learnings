import { Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly pimHeader: string;
    readonly pimContainer: string;
    readonly dashboardGrid: string;

    constructor(page: Page) {
        this.page = page;
        this.pimHeader = `//span[text()='PIM']`;
        this.pimContainer = 'div.orangehrm-background-container';
        this.dashboardGrid = 'div.orangehrm-dashboard-grid';
    }

    async clickPIMMenu() {
        await (await this.page.waitForSelector(this.pimHeader)).waitForElementState('stable');
        await this.page.getByRole('link', { name: 'PIM' }).click();
        await this.page.waitForSelector(this.pimContainer);
        await this.page.waitForTimeout(2000);
    };
}