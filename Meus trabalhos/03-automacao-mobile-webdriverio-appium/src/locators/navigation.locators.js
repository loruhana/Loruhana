// Barra de abas inferior e menu lateral.
// Os accessibility ids são iguais em Android (content-desc) e iOS (name).
export const TAB_BAR = {
  home: '~Home',
  webview: '~Webview',
  login: '~Login',
  forms: '~Forms',
  swipe: '~Swipe',
  drag: '~Drag',
  menu: '~Menu',
};

export const SIDE_MENU = {
  panel: '~tab-side-menu-panel',
  item: (key) => `~side-menu-item-${key}`,
};

// Container raiz de cada tela.
export const SCREENS = {
  home: '~Home-screen',
  login: '~Login-screen',
  forms: '~Forms-screen',
  swipe: '~Swipe-screen',
  drag: '~Drag-drop-screen',
};
