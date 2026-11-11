class NoticiaPage {
  constructor(page) {
    this.page = page;
    this.seletorArticle = '//article[@itemprop="articleBody"]';
  }

  async validarSePaginaDaNoticiaCarregou() {
    await this.page.waitForSelector(this.seletorArticle, { timeout: 10000 });
  }
}

module.exports = { NoticiaPage };
