import { expect } from 'chai';
import authScreen from '../../src/screens/auth.screen.js';
import alert from '../../src/screens/components/alert.component.js';
import { loadData } from '../../src/utils/data.js';

const { login, successAlerts } = loadData('auth');

describe('Login', () => {
  beforeEach(async () => {
    await authScreen.open();
    await authScreen.showLoginForm();
  });

  it('CT01 - deve autenticar com credenciais válidas e exibir alerta de sucesso', async () => {
    await authScreen.login(login.valid);

    const { title, message } = await alert.read();
    expect(title).to.equal(successAlerts.login.title);
    expect(message).to.equal(successAlerts.login.message);

    await alert.confirm();
    expect(await authScreen.isShown()).to.equal(true);
  });

  it(`CT02 - deve aceitar ${login.boundary.case}`, async () => {
    await authScreen.login(login.boundary);

    const { title } = await alert.read();
    expect(title).to.equal(successAlerts.login.title);
    await alert.confirm();
  });

  describe('CT03 - deve bloquear o login e exibir mensagens de erro (data-driven)', () => {
    login.invalid.forEach((data) => {
      it(`com ${data.case}`, async () => {
        await authScreen.login(data);

        for (const text of data.expectedMessages) {
          expect(await authScreen.isValidationMessageShown(text), `mensagem "${text}" não exibida`).to.equal(true);
        }
        expect(await alert.appearsWithin(1500), 'alerta de sucesso não deveria aparecer').to.equal(false);
      });
    });
  });
});
