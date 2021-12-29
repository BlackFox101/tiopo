import {Browser} from '../lib/Browser.js';
import {Element} from '../lib/Element.js';
import {By, until} from 'selenium-webdriver';

const SITE_URL = 'http://91.210.252.240:9000/';

export class HomePage {
    /**
     * @param {Browser} browser
     */
    constructor(browser) {
        this._browser = browser;
    }

    async open() {
        await this._browser.get(SITE_URL);
    }

    async goToLoginPage()
    {
        const accountButton = new Element(this._browser, By.xpath('/html/body/div[1]/div/div/div[1]/div/div[2]/a'));
        await accountButton.click();
        const entryButton = new Element(this._browser,  By.xpath('/html/body/div[1]/div/div/div[1]/div/div[2]/ul/li[1]/a'));
        await entryButton.click();
        await this._browser.wait(until.titleIs('Вход'), 5000)
    }

    async goToCategoryMen()
    {
        const menButton = new Element(this._browser, By.xpath('/html/body/div[3]/div/div/div[1]/div[1]/div/ul/li[1]/a'));
        await menButton.click();
        await this._browser.wait(until.titleIs('Men'), 5000)
        let driver = await this._browser.driver();
        await driver.sleep(5000);
    }

}