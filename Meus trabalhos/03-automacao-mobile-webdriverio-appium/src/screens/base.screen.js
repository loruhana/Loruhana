import { el } from '../utils/platform.js';

/** Comportamento comum: toda tela é identificada pelo seu container raiz. */
export default class BaseScreen {
  constructor(containerLocator) {
    this.containerLocator = containerLocator;
  }

  get container() {
    return el(this.containerLocator);
  }

  async waitForShown(timeout = 15000) {
    await this.container.waitForDisplayed({ timeout });
    return this;
  }

  async isShown() {
    return this.container.isDisplayed();
  }
}
