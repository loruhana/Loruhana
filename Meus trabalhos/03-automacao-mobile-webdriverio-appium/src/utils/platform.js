/**
 * Resolve um locator para a plataforma da sessão atual.
 * Aceita string (mesmo seletor nas duas plataformas) ou { android, ios }.
 */
export function resolve(locator) {
  if (typeof locator === 'string') return locator;
  const selector = driver.isIOS ? locator.ios : locator.android;
  if (!selector) {
    throw new Error(`Locator sem definição para ${driver.isIOS ? 'iOS' : 'Android'}: ${JSON.stringify(locator)}`);
  }
  return selector;
}

/** Elemento pelo texto visível, com a estratégia nativa de cada plataforma. */
export function byText(text) {
  return {
    android: `android=new UiSelector().text("${text}")`,
    ios: `-ios predicate string:label == "${text}"`,
  };
}

export const el = (locator) => $(resolve(locator));

/**
 * Rola a tela até o elemento com o accessibility id informado ficar visível.
 * Necessário em telas pequenas, onde o Android não expõe elementos fora da área visível.
 */
export async function scrollToAccessibilityId(id) {
  if (driver.isIOS) {
    await driver.execute('mobile: scroll', { direction: 'down', predicateString: `name == "${id}"` });
  } else {
    await $(
      `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("${id}"))`
    );
  }
}
