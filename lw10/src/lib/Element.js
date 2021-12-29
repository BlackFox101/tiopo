import {Browser} from './Browser.js';
import {By} from 'selenium-webdriver';

export class Element {
    /**
     * @param {Browser} browser
     * @param {By} locatorBy
     */
    constructor(browser, locatorBy) {
        this._browser = browser;
        this._locatorBy = locatorBy;
    }

    async init() {
        let driver = await this._browser.driver();
        this._element = await driver.findElement(this._locatorBy)
    }

    async click() {
        if (!this._element)
        {
            await this.init();
        }

        this._element.click();
    }

    async sendKeys(...args) {
        if (!this._element)
        {
            await this.init();
        }

        await this._element.sendKeys(...args)
    }

    async findElement(locatorBy)
    {
        return new Element(this._browser, locatorBy)
    }
}