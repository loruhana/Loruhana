const { test, expect } = require('@playwright/test');
const { Homepage } = require('../pages/Homepage');
const { NoticiaPage } = require('../pages/Noticiapage');

test('Acessar uma notícia da home e validar se abriu', async ({ page }) => {
  const home = new Homepage(page);
  const noticia = new NoticiaPage(page);

  await home.acessar();
  await home.aceitarCookies();
  await home.scrollAteOFim();
  await home.clicarPrimeiraNoticia();

  await noticia.validarSePaginaDaNoticiaCarregou();
});
