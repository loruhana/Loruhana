import { expect } from 'chai';
import formsScreen from '../../src/screens/forms.screen.js';
import alert from '../../src/screens/components/alert.component.js';
import { loadData } from '../../src/utils/data.js';

const data = loadData('forms');

describe('Formulários (tela Forms)', () => {
  beforeEach(async () => {
    await formsScreen.open();
  });

  describe('CT10 - deve refletir o texto digitado no campo de resultado (data-driven)', () => {
    data.textInputs.forEach(({ case: description, value }) => {
      it(`com ${description}`, async () => {
        await formsScreen.typeText(value);
        expect(await formsScreen.typedResult()).to.equal(value);
      });
    });
  });

  it('CT11 - deve ligar e desligar o switch atualizando o texto de apoio', async () => {
    expect(await formsScreen.isSwitchOn()).to.equal(false);
    expect(await formsScreen.switchText.getText()).to.equal(data.switch.offText);

    await formsScreen.toggleSwitch();
    expect(await formsScreen.isSwitchOn()).to.equal(true);
    expect(await formsScreen.switchText.getText()).to.equal(data.switch.onText);

    await formsScreen.toggleSwitch();
    expect(await formsScreen.isSwitchOn()).to.equal(false);
    expect(await formsScreen.switchText.getText()).to.equal(data.switch.offText);
  });

  describe('CT12 - deve selecionar cada opção do dropdown (data-driven)', () => {
    data.dropdownOptions.forEach((option) => {
      it(`opção "${option}"`, async () => {
        await formsScreen.selectOption(option);
        expect(await formsScreen.selectedOption()).to.equal(option);
      });
    });
  });

  it('CT13 - deve preencher o formulário completo e confirmar no botão Active', async () => {
    const [text] = data.textInputs;
    const option = data.dropdownOptions.at(-1);

    await formsScreen.typeText(text.value);
    await formsScreen.toggleSwitch();
    await formsScreen.selectOption(option);

    expect(await formsScreen.typedResult()).to.equal(text.value);
    expect(await formsScreen.isSwitchOn()).to.equal(true);
    expect(await formsScreen.selectedOption()).to.equal(option);

    await formsScreen.tapActiveButton();
    const { title, message } = await alert.read();
    expect(title).to.equal(data.activeButtonAlert.title);
    expect(message).to.equal(data.activeButtonAlert.message);
    await alert.confirm();
  });

  it('CT14 - não deve exibir alerta ao tocar no botão Inactive', async () => {
    await formsScreen.tapInactiveButton();
    expect(await alert.appearsWithin(2000)).to.equal(false);
    expect(await formsScreen.isShown()).to.equal(true);
  });
});
