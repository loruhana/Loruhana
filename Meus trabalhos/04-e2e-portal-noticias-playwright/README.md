# Automação E2E de Portal de Notícias Esportivas com Playwright

Este projeto implementa testes automatizados para um portal de notícias esportivas utilizando o framework Playwright e seguindo o padrão Page Object Model (POM).

## Critérios de Aceite em BDD

### Feature: Exibição de notícias na página inicial
```gherkin
Funcionalidade: Exibição de notícias na página inicial
  Como um usuário do portal de notícias
  Eu quero visualizar as últimas notícias esportivas na página inicial
  Para me manter informado sobre os acontecimentos esportivos recentes

  Cenário: Verificar se a página inicial exibe pelo menos 10 notícias
    Dado que eu acesso a página inicial do portal de notícias
    Quando a página é carregada completamente
    Então devo visualizar pelo menos 10 notícias na página
```

### Feature: Navegação para matéria completa
```gherkin
Funcionalidade: Navegação para matéria completa
  Como um usuário do portal de notícias
  Eu quero clicar em uma notícia
  Para ler a matéria completa

  Cenário: Verificar redirecionamento ao clicar em uma notícia
    Dado que eu acesso a página inicial do portal de notícias
    Quando eu clico em uma notícia
    Então devo ser redirecionado para a página da matéria completa
```

### Feature: Navegação para página de times da Série A
```gherkin
Funcionalidade: Navegação para página de times da Série A
  Como um usuário do portal de notícias
  Eu quero acessar a página de um time da Série A
  Para visualizar notícias relacionadas ao clube

  Cenário: Verificar redirecionamento ao selecionar um time da Série A
    Dado que eu acesso a página inicial do portal de notícias
    Quando eu passo o mouse sobre o menu TIMES
    E seleciono um time do Campeonato Brasileiro
    Então devo ser redirecionado para a página do clube selecionado
```

## Estrutura do Projeto

```
04-e2e-portal-noticias-playwright/
├── pages/
│   └── Homepage.js
│   ├── Noticiapage.js
├── testes/
│   ├── homepage.spec.js
│   ├── noticia.spec.js
│   └── Serie_A.spec.js
├── package.json
└── README.md
```

## Padrão Page Object Model

Este projeto utiliza o padrão Page Object Model (POM), que é uma prática de design que cria um objeto de repositório para elementos da interface do usuário. Os benefícios incluem:

- Redução da duplicação de código
- Melhoria na manutenção dos testes
- Aumento da legibilidade do código
- Separação entre lógica de teste e lógica de interação com a página

### Estrutura de Page Objects:

- **Homepage.js**: Representa a página inicial do portal de notícias, contendo métodos para:
  - Acessar a página inicial
  - Aceitar cookies
  - Interagir com o menu de times
  - Clicar em notícias
  - Validar quantidade de notícias
  - Realizar scroll dinâmico

## Justificativa dos Seletores Utilizados

### Seletor `//article[@itemprop="articleBody"]`
Este seletor foi escolhido porque representa diretamente o conteúdo principal da reportagem. Esse elemento engloba todo o texto da matéria, garantindo que, ao acessar uma notícia, o usuário está sendo redirecionado corretamente para a página que contém o corpo completo da reportagem, atendendo ao objetivo do projeto.

### Seletor `//div[@class="feed-post-body"]`
Este seletor foi escolhido porque representa a estrutura completa de cada notícia exibida na página. Esse elemento agrupa de forma consistente os principais componentes de uma notícia (imagem, título e resumo), permitindo uma contagem precisa que reflete a quantidade de notícias visíveis para o usuário. Isso garante uma validação robusta e alinhada à experiência real do usuário na interface..

## Dependências

- Node.js (v14 ou superior)
- Playwright
- @playwright/test

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/loruhana/loruhana.git
cd "loruhana/Meus trabalhos/04-e2e-portal-noticias-playwright"
```

2. Instale as dependências:
```bash
npm install
```

3. Instale os navegadores do Playwright:
```bash
npx playwright install
```

## Executando os Testes

Para executar todos os testes:
```bash
npx playwright test
```

Para executar um arquivo de teste específico:
```bash
npx playwright test testes/homepage.spec.js
```

Para executar os testes em modo UI:
```bash
npx playwright test --ui
```

## Relatórios

Após a execução dos testes, um relatório HTML será gerado em `playwright-report/`. Para visualizá-lo:
```bash
npx playwright show-report
```

## Implementação dos Testes

Os testes estão organizados em arquivos separados por funcionalidade:
- `homepage.spec.js`: Testes para a página inicial, verificando a exibição de pelo menos 10 notícias
- `noticia.spec.js`: Testes para a navegação e página de notícias, verificando o redirecionamento ao clicar em uma notícia
- `Serie_A.spec.js`: Testes para a navegação e página de times, verificando o redirecionamento ao selecionar um time da Série A
