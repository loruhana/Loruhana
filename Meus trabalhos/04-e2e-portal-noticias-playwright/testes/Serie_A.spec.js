const { test, expect } = require('@playwright/test');
const { Homepage } = require('../pages/Homepage');

test('Acessar a página do primeiro time da série A', async ({ page }) => {
  const home = new Homepage(page);

  await home.acessar();
  await home.aceitarCookies();
  await home.hoverMenuTimes();
  await home.clicarPrimeiroTime();

  await home.scrollAteOFim();
}, 60000);

