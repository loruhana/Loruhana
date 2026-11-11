import { el } from '../../utils/platform.js';
import { ALERT } from '../../locators/alert.locators.js';

class AlertComponent {
  get title() { return el(ALERT.title); }
  get message() { return el(ALERT.message); }
  get okButton() { return el(ALERT.okButton); }

  async waitForShown(timeout = 10000) {
    await this.title.waitForDisplayed({ timeout });
  }

  /** Retorna título e mensagem do alerta exibido. */
  async read() {
    await this.waitForShown();
    return { title: await this.title.getText(), message: await this.message.getText() };
  }

  /** Verifica, com espera explícita, se algum alerta aparece dentro do prazo. */
  async appearsWithin(timeout) {
    try {
      await this.title.waitForDisplayed({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async confirm() {
    await this.okButton.click();
    await this.title.waitForDisplayed({ reverse: true });
  }
}

export default new AlertComponent();
