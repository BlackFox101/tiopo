import {Browser} from '../lib/Browser.js';
import {Element} from '../lib/Element.js';
import {By, until} from 'selenium-webdriver';

import authorizationData from '../data/authorizationData.js'

export class AuthorizationPage {
    /**
     * @param {Browser} browser
     */
    constructor(browser) {
        this._browser = browser;
    }

    async EnterUsernameAndPassword() {
        const loginField = new Element(this._browser, By.xpath('/html/body/div[4]/div[3]/div/div/div/div/div[2]/div/form/div[1]/input'));
        const passField = new Element(this._browser, By.xpath('/html/body/div[4]/div[3]/div/div/div/div/div[2]/div/form/div[2]/input'));
        await loginField.sendKeys(authorizationData.login);
        await passField.sendKeys(authorizationData.password);
    }

    async LogIn()
    {
        const enterButton = new Element(this._browser, By.xpath('/html/body/div[4]/div[3]/div/div/div/div/div[2]/div/form/button'));
        await enterButton.click();
        let driver = await this._browser.driver();
        await driver.sleep(5000);
    }

    async CheckLoginSuccessful()
    {
        try {
            const successLogInBloc = new Element(this._browser, By.xpath('/html/body/div[4]/div[1]/div/div/div'));
            return true;
        }
        catch {
            return false;
        }
    }

}