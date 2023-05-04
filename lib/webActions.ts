import type { Locator, Page } from '@playwright/test';
import { BrowserContext, expect } from '@playwright/test';

export class WebActions {

    constructor(private page: Page) {
        this.page = page;
    }

    /**
     * Returns the main resource response. In case of multiple redirects, the navigation will resolve with the first non-redirect response.
     * @params - url -  URL to navigate page to, The url should include scheme, e.g. https://
     *
     */
    async navigateToURL(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Checks URL redirects
     * In case of multiple redirects, the navigation will resolve with the first non-redirect response.
     * @params - url -  URL to navigate page to, The url should include scheme, e.g. https://
     *
     */
    async checkUrl(url: string, newUrl: string): Promise<void> {
        await this.page.goto(url)
        expect(this.page.url()).toBe(newUrl);
    }

    /**
     * Sets a Delay based on setTimeout: NodeJS.Timeout;
     * @params - time - number of secconds to be set
     *
     */
    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    /**
     * Wait for actionability checks on the element, unless force option is set.
     * Scroll the element into view if needed.
     * Use page.mouse to click in the center of the element, or the specified position.
     * Wait for initiated navigations to either succeed or fail, unless noWaitAfter option is set.
     * @params - locator -  A selector to use when resolving DOM element
     *
     */
    async clickElement(locator: Locator, button?: string, clickCount?: number, delay?: number, force?: boolean, timeout?: number): Promise<void> {
        await locator.click();
    }

    /**
     * This method waits for actionability checks, then tries to scroll element into view,
     * unless it is completely visible as defined by IntersectionObserver's ratio
     * @params - locator -  A selector to use when resolving DOM element
     *
     */
    async scrollToElement(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded()
    }

    /**
     * Checks if focus is on the element.
     * @params - locator - A selector to use when resolving DOM element
     *         - value - a bollean valu
     *
     */
    async checkFocusOnElement(locator: Locator, value: Boolean): Promise<void> {
        expect(locator.focus()).toBe(value);
    }

    /**
     * This method hovers over the element and clicks on it
     * @params - locator - A selector to use when resolving DOM element
     */
    async hoverAndClick(locator: Locator): Promise<void> {
        await locator.hover();
        await locator.click();
    }

    /**
     * This method ensures the Locator resolves to an exact number of DOM nodes.
     * @params - locator - A selector to use when resolving DOM element
     *         - count - number of expected elements
     */
    async verifyLocatorListCount(locator: Locator, count: number): Promise<void> {
        expect(locator).toHaveCount(count);
    }

    /**
     * This method waits for actionability checks, focuses the element, fills it and triggers an input event after filling.
     * Note that you can pass an empty string to clear the input field.
     * @params - locator - A selector to use when resolving DOM element
     *         - text - A string to be used
     *
     */
    async enterElementText(locator: Locator, text: string): Promise<void> {
        await locator.fill(text);
    }

    /**
     * Returns the node.textContent.
     * The textContent property of the Node interface represents the text content of the node and its descendants.
     * @params - locator - A selector to use when resolving DOM element
     *
     */
    async getTextFromWebElements(locator: Locator): Promise<string> {
        let textValue = await locator.textContent();
        return textValue!;
    }

    /**
     * Checks if the text inside the element is equal to the given value
     * @params - locator - A selector to use when resolving DOM element
     *           text - value to compare
     *
     */
    async verifyElementTextEquals(locator: Locator, text: string): Promise<void> {
        const textValue = await locator.textContent();
        expect(textValue?.trim()).toBe(text);
    }

    /**
     * Playwright test/ Jest expect library method
     * Checks if the text inside the element contains the given value
     * @params - locator - A selector to use when resolving DOM element
     *           text - value to compare
     *
     */
    async verifyElementTextContains(locator: Locator, text: string): Promise<void> {
        const textValue = await locator.textContent();
        expect(textValue?.trim()).toContain(text);
    }

    /**
     * Returns element attribute value.
     * @params - locator - A selector to use when resolving DOM element
     *         - value - A string that holds the returned value
     *
     */
    async getAttributeFromElement(locator: Locator, value: string): Promise<string> {
        const attributeValue = await locator.getAttribute(value);
        return attributeValue!;
    }

    /**
     * Checks if the value inside an element attribute contains the given value
     * @params - locator - A selector to use when resolving DOM element
     *           text - value to compare
     *
     */
    async verifyAttributeContains(locator: Locator, value: string, text: string): Promise<void> {
        const attributeValue = await locator.getAttribute(value);
        expect(attributeValue?.trim()).toContain(text);
    }

    /**
     * Checks if the value inside an element attribute does not contains the given value
     * @params - locator - A selector to use when resolving DOM element
     *           text - value to compare
     *
     */
    async verifyAttributeDoesNotContain(locator: Locator, value: string, text: string): Promise<void> {
        const attributeValue = await locator.getAttribute(value);
        expect(attributeValue?.trim()).not.toContain(text);
    }

    /**
     * Keyboard provides an api for managing a virtual keyboard.
     * @params - key -  key can specify the intended keyboardEvent.key value or a single character to generate the text for.
     * A superset of the key values can be found here. Examples of the keys are:
     * F1 - F12, Digit0- Digit9, KeyA- KeyZ, Backquote, Minus, Equal, Backslash, Backspace, Tab, Delete, Escape,
     * ArrowDown, End, Enter, Home, Insert, PageDown, PageUp, ArrowRight, ArrowUp, etc
     *
     */
    async keyboardPressButton(key: string): Promise<void> {
        await this.page.keyboard.press(key);
    }

    /**
     * Focuses the element, and then uses keyboard.down(key) and keyboard.up(key).
     * @params - key <string> - Name of the key to press or a character to generate, such as ArrowLeft or a.#
     *
     */
    async keyPress(locator: Locator, key: string): Promise<void> {
        await locator.press(key);
    }

    /**
     * Returns when element specified by locator satisfies the state option.
     * If target element already satisfies the condition, the method returns immediately.
     * Otherwise, waits for up to timeout milliseconds until the condition is met.
     * @params - locator - A selector to use when resolving DOM element
     *         - errorMessage - a string to return a message
     *         - state? <"attached"|"detached"|"visible"|"hidden"> Defaults to 'visible'
     *
     */
    async verifyElementIsDisplayed(locator: Locator, errorMessage?: string): Promise<void> {
        //await locator.isEnabled( {timeout: 8000 })
        await locator.waitFor({ state: `visible`, timeout: 5000 })
            .catch(() => { throw new Error(`${errorMessage}`); });
    }

    /**
     * Returns when element specified by locator satisfies the state option.
     * If target element already satisfies the condition, the method returns immediately.
     * Otherwise, waits for up to timeout milliseconds until the condition is met.
     * @params - locator - A selector to use when resolving DOM element
     *         - errorMessage - a string to return a message
     *         - state? <"attached"|"detached"|"visible"|"hidden"> Defaults to 'visible'
     *
     */
    async verifyElementIsNotDisplayed(locator: Locator, errorMessage?: string): Promise<void> {
        //await locator.isHidden({ timeout: 8000 })
        await locator.waitFor({ state: 'hidden', timeout: 25000 })
            .catch(() => { throw new Error(`${errorMessage}`); });
    }

    /**
     * Ensures the Locator points to an enabled element.
     * Playwright test assertion
     * @params - locator - A selector to use when resolving DOM element
     *
     */
    async verifyElementIsEnabled(locator: Locator): Promise<void> {
        await expect(locator).toBeEnabled();
    }

    /**
     * Ensures the Locator points to a disabled element. Element is disabled if it has "disabled" attribute or is disabled via 'aria-disabled'
     * Note that only native control elements such as HTML button, input, select, textarea, option, optgroup can be disabled by setting "disabled" attribute. 
     * "disabled" attribute on other elements is ignored by the browser.
     * Playwright test assertion
     * @params - locator - A selector to use when resolving DOM element
     *
     */
    async verifyElementIsDissabled(locator: Locator): Promise<void> {
        await expect(locator).toBeDisabled();
    }

    // replaces //waitForElementInvisible from old framework
    /**
     * Ensures the Locator is hidden.disabled and will not appear again in the DOM
     * @params - locator - A selector to use when resolving DOM element
     *         - timeout - number of seconds/milliseconds
     *         - poolingTimeout - number of seconds/milliseconds
     *
     */
    async waitForSelectorToCompletelyDisappear(selector: Locator, timeout = 500, pollingTimeout = 100): Promise<boolean> {
        const startTime = Date.now();
        let duration = 0;
        let isDisappeared = false;

        async function endTime(): Promise<any> {
            let now = await selector.waitFor({ state: 'hidden', timeout })
                .then(async () => {
                    console.log(`disappeared`);
                    isDisappeared = true;
                    return Date.now();
                })
                .catch(async () => {
                    console.log(`visible`);
                    isDisappeared = false;
                    return Date.now();
                })
            return now;
        }

        duration = (await endTime()) - startTime;
        while (duration < timeout) {
            duration = (await endTime()) - startTime;
            await this.page.waitForTimeout(pollingTimeout);
        }
        console.log(`Disappeared finally: ${isDisappeared}`);
        return isDisappeared;
    }

    /**
     * Ensures the Locator points to an enabled element.
     * Playwright test assertion
     * @params - locator - A selector to use when resolving DOM element
     *
     */
    async selectOptionFromDropdown(locator: string, value: string): Promise<void> {
        //const selectDropDownLocator = this.page.locator(locator);
        //selectDropDownLocator?.selectOption(values);
        this.page.selectOption(locator, value);
        const selectedValue = await this.page.$eval(locator, (element) => element.nodeValue);
        expect(selectedValue).toContain(value);
    }

    // async downloadFile(locator: Locator): Promise<string> {
    //     const [download] = await Promise.all([
    //         this.page.waitForEvent(`download`),
    //         locator.click();
    //     ]);
    //     await download.saveAs(path.join(__dirname, `../Downloads`, download.suggestedFilename()));
    //     return download.suggestedFilename();
    // }

    // async verifyNewWindowUrlAndClick(context: BrowserContext, newWindowLocator: Locator, urlText: string,clickOnNewWindowLocator: Locator): Promise<void> {
    //     const [newPage] = await Promise.all([
    //         context.waitForEvent('page'),
    //         newWindowLocator.click()
    //     ])
    //     await newPage.waitForLoadState();
    //     expect(newPage.url()).toContain(urlText);
    //     clickOnNewWindowLocator.click();
    //     await newPage.close();
    // }

    /**
     *
     * @param enumeration
     * @returns a random value from an enum
     */
    randomEnumValue = (enumeration): string => {
        const values = Object.keys(enumeration);
        const enumKey = values[Math.floor(Math.random() * values.length)];
        return enumeration[enumKey];
    };

    /**
     * Returns an integer random number between min and max
     * @params - min - minimum accepted number
     *         - max - maximum accepted number
     */
    randomInteger = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * Returns a random string of a predefined length
     * @params - length - length of the desired string
     */
    randomString = (length: number): string => {
        return [...Array<string>(length + 10)]
            .map(() => (Math.random() * 1000000).toString(36).replace('.', ''))
            .join('')
            .substring(0, length);
    };

    /**
     * Returns an random number of fixed length
     * The generator allows for ~infinite length without lossy precision and with minimal performance cost.
     * @params - nr - the length of the random number
     */
    generateFixedRandom = (nr: number): string => {
        const add = 1;
        let max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

        if (nr > max) {
            return this.generateFixedRandom(max) + this.generateFixedRandom(nr - max);
        }

        max = Math.pow(10, nr + add);
        const min = max / 10;
        const number = Math.floor(Math.random() * (max - min + 1)) + min;

        return number.toString().substring(add);
    };

    /**
     * Method for generating random password with specific rules
     * Generate random password composed of uppercase, lowercase, numbers and special characters
     * @params -number - the number of each character type in the password
     *
     */
    getRandomPassword(number: number): string {
        let resultA = "",
            resultB = "",
            resultC = "",
            resultD = "",
            result = "";
        let upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        let numbers = '0123456789';
        let specialChar = '!@#$%^&*()><?:"|{}+_';
        for (let i = 0; i < number; i++) {
            resultA += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
            resultB += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
            resultC += numbers.charAt(Math.floor(Math.random() * numbers.length));
            resultD += specialChar.charAt(Math.floor(Math.random() * specialChar.length));
            result = resultA + resultB + resultC + resultD;
        }
        return result;
    }
}