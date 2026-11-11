# 💻 Automação E2E de Cadastro com Playwright

Testes automatizados do fluxo de **cadastro de usuário** em um e-commerce de demonstração ([Automation Exercise](https://automationexercise.com)), usando **Playwright** com o padrão **Page Object Model (POM)** e massa de dados dinâmica.

## 🚀 Stack

- [Playwright](https://playwright.dev/) (JavaScript / Node.js)
- [Faker](https://fakerjs.dev/) para gerar dados únicos a cada execução
- GitHub Actions (`.github/workflows/ci-playwright.yml`)

## 🔍 O que o teste valida

1. Acessa o site e inicia o cadastro com um e-mail gerado pelo Faker
2. Preenche o formulário completo de dados pessoais e endereço
3. Cria a conta
4. Confirma que o usuário está logado (item **Logout** visível no menu)

## 🗂️ Estrutura

```
pages/SignupPage.js     Page Object com as ações da tela de cadastro
tests/cadastro.spec.js  cenário de cadastro de ponta a ponta
playwright.config.js    configuração do Playwright
```

## ▶️ Como executar

```bash
npm install
npx playwright install
npx playwright test            # modo headless
npx playwright test --headed   # vendo o navegador
npx playwright show-report     # relatório HTML
```
