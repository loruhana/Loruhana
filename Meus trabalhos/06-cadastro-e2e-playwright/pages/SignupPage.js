class SignupPage {
  constructor(page) {
    this.page = page;
  }

  async visitarSite(email) {
    await this.page.goto('http://automationexercise.com');
    await this.page.click('a[href="/login"]');
    await this.page.getByRole('textbox', { name: 'Name' }).fill('QA TESTE');
    await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }

  async preencherDados(user) {
    await this.page.getByText('Mrs.').click();
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(user.password);
    await this.page.locator('#days').selectOption('4');
    await this.page.locator('#months').selectOption('1');
    await this.page.locator('#years').selectOption('1995');
    await this.page.locator('#form form div').filter({ hasText: 'Receive special offers from' }).click();
    await this.page.getByRole('textbox', { name: 'First name *' }).fill('Lorrana');
    await this.page.getByRole('textbox', { name: 'Last name *' }).fill('QATEST');
    await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill('Quality');
    await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Rua Assurance');
    await this.page.getByLabel('Address 2').fill('tst');
    await this.page.getByLabel('Country *').selectOption('New Zealand');
    await this.page.getByRole('textbox', { name: 'State *' }).fill('Hawkes Bay');
    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Teste');
    await this.page.locator('#zipcode').fill('4078');
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill('5511900000000');
    await this.page.getByRole('button', { name: 'Create Account' }).click();
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}

module.exports = SignupPage;
