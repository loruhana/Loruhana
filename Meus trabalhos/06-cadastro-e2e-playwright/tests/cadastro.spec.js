const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const SignupPage = require('../pages/SignupPage');

test('Realizar cadastro', async ({ page }) => {
  const signupPage = new SignupPage(page);

  const email = faker.internet.email();
  const user = {
    email,
    password: 'teste123',
  };

  console.log('📧 Email gerado:', user.email);

  await signupPage.visitarSite(user.email);
  await signupPage.preencherDados(user);

  await expect(page.getByRole('listitem').filter({ hasText: 'Logout' })).toBeVisible();
});
