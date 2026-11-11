import { el } from '../../utils/platform.js';
import { TAB_BAR, SIDE_MENU } from '../../locators/navigation.locators.js';

class NavigationComponent {
  /** Toca em uma aba da barra inferior (home, login, forms, swipe, drag...). */
  async goToTab(tab) {
    const locator = TAB_BAR[tab];
    if (!locator) throw new Error(`Aba desconhecida: ${tab}`);
    await el(locator).click();
  }

  async openSideMenu() {
    await el(TAB_BAR.menu).click();
    await el(SIDE_MENU.panel).waitForDisplayed();
  }

  async chooseSideMenuItem(key) {
    await el(SIDE_MENU.item(key)).click();
    await el(SIDE_MENU.panel).waitForDisplayed({ reverse: true });
  }
}

export default new NavigationComponent();
