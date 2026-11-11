const { test, expect } = require('@playwright/test');
const { Homepage } = require('../pages/Homepage');

test('Validar se a home possui no mínimo 10 notícias', async ({ page }) => {
  const home = new Homepage(page);

  await home.acessar();
  await home.aceitarCookies();
  await home.scrollAteOFim();
  await home.validarMinimoDeNoticias();
});
