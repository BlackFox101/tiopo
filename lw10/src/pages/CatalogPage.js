import {Browser} from '../lib/Browser.js';
import {Element} from '../lib/Element.js';
import {By, until} from 'selenium-webdriver';

import watchData from '../data/watchData.js'

export class CatalogPage {
    /**
     * @param {Browser} browser
     */
    constructor(browser) {
        this._browser = browser;
    }

    async findWatch()
    {
        this._foundWatch = new Element(this._browser, By.partialLinkText(watchData.name));
    }

    async goToWatchInfoPage()
    {
        const mask = await this._foundWatch.findElement(By.className('mask'));
        await mask.click();
        await this._browser.wait(until.titleIs(watchData.name), 5000)
    }

}