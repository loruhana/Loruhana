const { expect } = require('@playwright/test');

exports.Homepage = class Homepage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cookieButton = '//button[@class="cookie-banner-lgpd_accept-button"]';
    this.menuTimes = 'div.icons-escudo-header';
    this.primeiraNoticia = '//p[@elementtiming="text-csr"]';
    this.noticiasFeed = '//div[@class="feed-post-body"]';
  }

  async acessar() {
    await this.page.goto('https://ge.globo.com/');
  }

  async aceitarCookies() {
    await this.page.waitForSelector(this.cookieButton, { timeout: 5000 });
    await this.page.click(this.cookieButton);
  }

  async hoverMenuTimes() {
    await this.page.hover(this.menuTimes);
  }

  async clicarPrimeiroTime() {
    await this.page.click('(//img[@class="mosaico__escudo--img"])[1]');
  }

  async clicarPrimeiraNoticia() {
    await this.page.click(this.primeiraNoticia);
  }

  async validarMinimoDeNoticias(quantidadeEsperada = 10) {
    const noticias = await this.page.locator(this.noticiasFeed);
    const quantidade = await noticias.count();
    console.log(`Quantidade de notícias encontradas: ${quantidade}`);
    expect(quantidade).toBeGreaterThanOrEqual(quantidadeEsperada);
  }

 async scrollAteOFim() {
  let previousHeight = await this.page.evaluate(() => document.body.scrollHeight);
  
  while (true) {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await this.page.waitForTimeout(1500); // tempo de espera para o carregamento dos itens

    const currentHeight = await this.page.evaluate(() => document.body.scrollHeight);

    if (currentHeight === previousHeight) {
      break; // Chegou no fim
    }

    previousHeight = currentHeight;
  }
}

};
