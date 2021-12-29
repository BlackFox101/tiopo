import {Browser} from '../src/lib/Browser.js';
import {HomePage} from '../src/pages/HomePage.js';
import {AuthorizationPage} from "../src/pages/AuthorizationPage.js";
import {CatalogPage} from "../src/pages/CatalogPage.js";
import {WatchInfoPage} from "../src/pages/WatchInfoPage.js";
import assert from 'assert';

describe('Tests', () => {
    it('Authorization', async () => {
        const browser = new Browser();
        const homePage = new HomePage(browser);
        try{
            await homePage.open();
            await homePage.goToLoginPage();

            const authorizationPage = new AuthorizationPage(browser);
            await authorizationPage.EnterUsernameAndPassword();
            await authorizationPage.LogIn();
            assert(await authorizationPage.CheckLoginSuccessful());
        } finally {
            await browser.close();
        }
    });

    it('Product search in the catalog', async () => {
        const browser = new Browser();
        const homePage = new HomePage(browser);
        try {
            await homePage.open();
            await homePage.goToCategoryMen();
            const catalogPage = new CatalogPage(browser);
            await catalogPage.findWatch();
            await catalogPage.goToWatchInfoPage();
        } finally {
            await browser.close();
        }
    });

    it('Adding an item to the cart ', async () => {
        const browser = new Browser();
        const homePage = new HomePage(browser);
        try {
            await homePage.open();
            await homePage.goToCategoryMen();
            const catalogPage = new CatalogPage(browser);
            await catalogPage.findWatch();
            await catalogPage.goToWatchInfoPage();
            const watchInfoPage = new WatchInfoPage(browser);
            await watchInfoPage.addWatchInCart();

        } finally {
            await browser.close();
        }
    });

    it('should ', async () => {
        const browser = new Browser();
        const homePage = new HomePage(browser);
        try {
            await homePage.open();
            await homePage.goToCategoryMen();
            const catalogPage = new CatalogPage(browser);
            await catalogPage.findWatch();
            await catalogPage.goToWatchInfoPage();
            const watchInfoPage = new WatchInfoPage(browser);
            await watchInfoPage.addWatchInCart();
            await watchInfoPage.placeOrder();
            assert(await watchInfoPage.CheckOrderPlacedSuccessfully());

        } finally {
            await browser.close();
        }
    });
});