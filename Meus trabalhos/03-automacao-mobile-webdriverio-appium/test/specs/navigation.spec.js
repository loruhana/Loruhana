import { expect } from 'chai';
import navigation from '../../src/screens/components/navigation.component.js';
import authScreen from '../../src/screens/auth.screen.js';
import { el } from '../../src/utils/platform.js';
import { SCREENS } from '../../src/locators/navigation.locators.js';
import { loadData } from '../../src/utils/data.js';

const { tabBar, sideMenu } = loadData('navigation');

describe('Navegação entre telas', () => {
  it('CT07 - deve navegar por todas as abas da barra inferior em sequência', async () => {
    for (const { tab, screen, label } of tabBar) {
      await navigation.goToTab(tab);
      await el(SCREENS[screen]).waitForDisplayed();
      expect(await el(SCREENS[screen]).isDisplayed(), `tela ${label} não exibida`).to.equal(true);
    }
  });

  describe('CT08 - deve abrir cada tela pelo menu lateral (data-driven)', () => {
    sideMenu.forEach(({ item, screen, label }) => {
      it(`menu lateral > ${label}`, async () => {
        await navigation.openSideMenu();
        await navigation.chooseSideMenuItem(item);

        await el(SCREENS[screen]).waitForDisplayed();
        expect(await el(SCREENS[screen]).isDisplayed()).to.equal(true);
      });
    });
  });

  it('CT09 - deve alternar entre as abas Login e Sign up do formulário', async () => {
    await authScreen.open();

    await authScreen.showSignUpForm();
    expect(await authScreen.isConfirmPasswordShown(), 'campo de confirmação deveria aparecer').to.equal(true);

    await authScreen.showLoginForm();
    expect(await authScreen.isConfirmPasswordShown(), 'campo de confirmação deveria sumir').to.equal(false);
  });
});
