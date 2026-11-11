import BaseScreen from './base.screen.js';
import { el, scrollToAccessibilityId } from '../utils/platform.js';
import { FORMS } from '../locators/forms.locators.js';
import { SCREENS } from '../locators/navigation.locators.js';
import navigation from './components/navigation.component.js';

class FormsScreen extends BaseScreen {
  constructor() {
    super(SCREENS.forms);
  }

  get input() { return el(FORMS.input); }
  get inputResult() { return el(FORMS.inputResult); }
  get switchToggle() { return el(FORMS.switch); }
  get switchText() { return el(FORMS.switchText); }
  get dropdown() { return el(FORMS.dropdown); }
  get dropdownValue() { return el(FORMS.dropdownValue); }
  get activeButton() { return el(FORMS.activeButton); }
  get inactiveButton() { return el(FORMS.inactiveButton); }

  async open() {
    await navigation.goToTab('forms');
    return this.waitForShown();
  }

  async typeText(text) {
    await this.input.setValue(text);
    if (await driver.isKeyboardShown()) await driver.hideKeyboard();
  }

  async typedResult() {
    return this.inputResult.getText();
  }

  async toggleSwitch() {
    const before = await this.isSwitchOn();
    await this.switchToggle.click();
    await browser.waitUntil(async () => (await this.isSwitchOn()) !== before, {
      timeoutMsg: 'O switch não mudou de estado após o toque',
    });
  }

  async isSwitchOn() {
    const attr = driver.isIOS ? 'value' : 'checked';
    const value = await this.switchToggle.getAttribute(attr);
    return value === 'true' || value === '1';
  }

  async selectOption(option) {
    await this.dropdown.click();
    const optionEl = el(FORMS.dropdownOption(option));
    await optionEl.waitForDisplayed();
    if (driver.isIOS) {
      await optionEl.addValue(option);
      await el(FORMS.dropdownDone).click();
    } else {
      await optionEl.click();
    }
    await browser.waitUntil(async () => (await this.selectedOption()) === option, {
      timeoutMsg: `O dropdown não exibiu a opção "${option}" após a seleção`,
    });
  }

  async selectedOption() {
    return this.dropdownValue.getText();
  }

  // Os botões ficam no fim do formulário: em telas pequenas é preciso rolar até eles.
  async tapActiveButton() {
    await scrollToAccessibilityId(FORMS.activeButton.slice(1));
    await this.activeButton.click();
  }

  async tapInactiveButton() {
    await scrollToAccessibilityId(FORMS.inactiveButton.slice(1));
    await this.inactiveButton.click();
  }
}

export default new FormsScreen();
