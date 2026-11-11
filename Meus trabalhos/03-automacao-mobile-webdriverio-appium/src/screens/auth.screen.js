import BaseScreen from './base.screen.js';
import { el, byText } from '../utils/platform.js';
import { AUTH } from '../locators/auth.locators.js';
import { SCREENS } from '../locators/navigation.locators.js';
import navigation from './components/navigation.component.js';

/** Tela "Login / Sign up Form" (as duas abas usam o mesmo formulário). */
class AuthScreen extends BaseScreen {
  constructor() {
    super(SCREENS.login);
  }

  get emailField() { return el(AUTH.email); }
  get passwordField() { return el(AUTH.password); }
  get confirmPasswordField() { return el(AUTH.confirmPassword); }
  get loginButton() { return el(AUTH.loginButton); }
  get signUpButton() { return el(AUTH.signUpButton); }

  async open() {
    await navigation.goToTab('login');
    return this.waitForShown();
  }

  async showLoginForm() {
    await el(AUTH.loginTab).click();
    await this.confirmPasswordField.waitForDisplayed({ reverse: true });
  }

  async showSignUpForm() {
    await el(AUTH.signUpTab).click();
    await this.confirmPasswordField.waitForDisplayed();
  }

  async isConfirmPasswordShown() {
    return this.confirmPasswordField.isDisplayed();
  }

  async login({ email = '', password = '' }) {
    await this.#fill(this.emailField, email);
    await this.#fill(this.passwordField, password);
    await this.#submit(this.loginButton);
  }

  async signUp({ email = '', password = '', confirmPassword = '' }) {
    await this.#fill(this.emailField, email);
    await this.#fill(this.passwordField, password);
    await this.#fill(this.confirmPasswordField, confirmPassword);
    await this.#submit(this.signUpButton);
  }

  /** Mensagem de validação exibida abaixo de um campo. */
  validationMessage(text) {
    return el(byText(text));
  }

  async isValidationMessageShown(text, timeout = 5000) {
    try {
      await this.validationMessage(text).waitForDisplayed({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async #fill(field, value) {
    await field.waitForDisplayed();
    await field.clearValue();
    if (value) await field.setValue(value);
  }

  // Fecha o teclado antes de tocar no botão para que ele não fique coberto.
  async #submit(button) {
    if (await driver.isKeyboardShown()) await driver.hideKeyboard();
    await button.click();
  }
}

export default new AuthScreen();
