import {Browser} from '../lib/Browser.js';
import {Element} from '../lib/Element.js';
import {By, until} from 'selenium-webdriver';

import watchData from '../data/watchData.js'

export class WatchInfoPage {
    /**
     * @param {Browser} browser
     */
    constructor(browser) {
        this._browser = browser;
    }


    async addWatchInCart()
    {
        const addToCartButton = new Element(this._browser, By.xpath('/html/body/div[4]/div[3]/div/div/div[1]/div[1]/div[2]/div/a'));
        await addToCartButton.click();
        const driver = await this._browser.driver();
        await driver.sleep(5000);
        const modal = new Element(this._browser, By.className('modal-content'));
        const watchAdded = await modal.findElement(By.partialLinkText(watchData.name));
    }

    async placeOrder() {
        const placeOrderButton = new Element(this._browser, By.xpath('/html/body/div[7]/div/div/div[3]/a'));
        await placeOrderButton.click();
        await this._browser.wait(until.titleIs('Корзина'), 5000);
        const placeButton = new Element(this._browser, By.xpath('/html/body/div[4]/div[3]/div/div/div/div/div[3]/form/button'));
        await placeButton.click();
        await this._browser.wait(until.titleIs('Корзина'), 2000);
    }

    async CheckOrderPlacedSuccessfully()
    {
        try {
            const successBlock = new Element(this._browser, By.xpath('/html/body/div[4]/div[1]/div/div/div'));
            return true;
        }
        catch {
            return false;
        }
    }
}