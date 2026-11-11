import { expect } from 'chai';
import authScreen from '../../src/screens/auth.screen.js';
import alert from '../../src/screens/components/alert.component.js';
import { loadData, uniqueEmail } from '../../src/utils/data.js';

const { signUp, successAlerts } = loadData('auth');

describe('Cadastro (Sign up)', () => {
  beforeEach(async () => {
    await authScreen.open();
    await authScreen.showSignUpForm();
  });

  it('CT04 - deve cadastrar um novo usuário com dados válidos', async () => {
    const user = { ...signUp.valid, email: uniqueEmail(signUp.valid.emailPrefix) };

    await authScreen.signUp(user);

    const { title, message } = await alert.read();
    expect(title).to.equal(successAlerts.signUp.title);
    expect(message).to.equal(successAlerts.signUp.message);

    await alert.confirm();
  });

  it('CT05 - deve exibir erro quando a confirmação de senha for diferente da senha', async () => {
    await authScreen.signUp(signUp.passwordMismatch);

    const [expected] = signUp.passwordMismatch.expectedMessages;
    expect(await authScreen.isValidationMessageShown(expected)).to.equal(true);
    expect(await alert.appearsWithin(1500)).to.equal(false);
  });

  describe('CT06 - deve recusar o cadastro com dados inválidos (data-driven)', () => {
    signUp.invalid.forEach((data) => {
      it(`com ${data.case}`, async () => {
        await authScreen.signUp(data);

        for (const text of data.expectedMessages) {
          expect(await authScreen.isValidationMessageShown(text), `mensagem "${text}" não exibida`).to.equal(true);
        }
        expect(await alert.appearsWithin(1500), 'alerta de sucesso não deveria aparecer').to.equal(false);
      });
    });
  });
});
