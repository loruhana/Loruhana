# Automação Mobile E2E – WebdriverIO + Appium

Automação de testes E2E do [native-demo-app](https://github.com/webdriverio/native-demo-app) (v2.2.0) com
**WebdriverIO + Appium + Mocha + Chai + Allure Report**, organizada em Page Objects, com massa de dados em JSON
(data-driven), execução em Android/iOS/BrowserStack e pipeline de CI/CD.

## Stack

| Item | Tecnologia |
|---|---|
| Linguagem | JavaScript (Node.js ≥ 20, ES Modules) |
| Framework | WebdriverIO 9 |
| Automação mobile | Appium 3 (drivers UiAutomator2 e XCUITest instalados via npm) |
| Runner | Mocha |
| Asserções | Chai |
| Relatórios | Allure Report |
| Cloud de dispositivos | BrowserStack App Automate |
| CI/CD | GitLab CI/CD (`.gitlab-ci.yml`) e GitHub Actions (`.github/workflows`) |

## Estrutura

```
config/                     configurações do WDIO por ambiente e capabilities centralizadas
  app.config.js             ids do app (pacote/bundle) e caminhos
  capabilities.js           capabilities Android, iOS e BrowserStack
  wdio.shared.conf.js       base comum: Mocha, Allure, hooks de evidência
  wdio.android.conf.js | wdio.ios.conf.js | wdio.browserstack.conf.js
src/
  locators/                 todos os seletores, por tela, com variação Android/iOS
  screens/                  Page Objects (telas) e components (alerta, navegação)
  utils/                    plataforma, relançamento do app, evidências, ambiente, dados
test/
  specs/                    cenários (login, cadastro, navegação, formulários)
  data/                     massa de dados em JSON
  hooks.js                  root hook: reabre o app antes de cada teste
ci/setup-android-emulator.sh  provisiona o emulador no GitLab CI
apps/                       binários do app (não versionados)
reports/                    allure-results, allure-report e logs (gerados)
```

## Cenários

| ID | Cenário | Categoria | Spec |
|---|---|---|---|
| CT01 | Login com credenciais válidas exibe alerta "Success" | Login | `login.spec.js` |
| CT02 | Login aceita senha com exatamente 8 caracteres (borda) | Login | `login.spec.js` |
| CT03 | Login inválido: e-mail sem @, senha de 7 caracteres, campos vazios (data-driven) | Login / Erros | `login.spec.js` |
| CT04 | Cadastro com dados válidos (e-mail único por execução) | Cadastro | `signup.spec.js` |
| CT05 | Cadastro com confirmação de senha diferente | Cadastro / Erros | `signup.spec.js` |
| CT06 | Cadastro inválido: e-mail sem domínio, senha curta, campos vazios (data-driven) | Cadastro / Erros | `signup.spec.js` |
| CT07 | Navegação por todas as abas da barra inferior | Navegação | `navigation.spec.js` |
| CT08 | Navegação pelo menu lateral para cada tela (data-driven) | Navegação | `navigation.spec.js` |
| CT09 | Alternância entre as abas Login e Sign up | Navegação | `navigation.spec.js` |
| CT10 | Campo de texto reflete o valor digitado (data-driven) | Formulários | `forms.spec.js` |
| CT11 | Switch liga/desliga e atualiza o texto de apoio | Formulários | `forms.spec.js` |
| CT12 | Seleção de cada opção do dropdown (data-driven) | Formulários | `forms.spec.js` |
| CT13 | Formulário completo + alerta do botão Active | Formulários | `forms.spec.js` |
| CT14 | Botão Inactive não exibe alerta | Formulários / Erros | `forms.spec.js` |

São 14 cenários, que viram 25 testes executados por causa das variações data-driven.

## Pré-requisitos

- **Node.js 20+** e npm
- **Java JDK 17+** com `JAVA_HOME` configurado
- **Android SDK** (Android Studio) com `ANDROID_HOME` configurado e `platform-tools` no `PATH`
- Um **emulador Android** (AVD) ou um dispositivo físico com depuração USB ativa
- Para iOS: **macOS + Xcode** com um simulador instalado
- Para o relatório: Java no `PATH` (o Allure CLI vem como dependência do projeto)

O Appium e seus drivers são instalados localmente pelo `npm install`; não é preciso instalação global.

## Instalação

```bash
npm install
```

Confira se os drivers foram reconhecidos:

```bash
npm run appium:drivers
```

## Preparando o app e o dispositivo

1. Baixe o `.apk` da [release v2.2.0](https://github.com/webdriverio/native-demo-app/releases/tag/v2.2.0) e salve como
   `apps/android.wdio.native.app.apk` (detalhes em [apps/README.md](apps/README.md)).
2. Inicie o emulador, pelo Android Studio (Device Manager) ou pela linha de comando:

   ```bash
   emulator -avd <nome-do-avd>
   ```

3. Confirme que ele aparece como `device`:

   ```bash
   adb devices
   ```

Se houver mais de um dispositivo conectado, informe qual usar com `ANDROID_UDID` (no `.env` ou na linha de comando).

## Executando

```bash
npm run test:android
```

Com mais de um dispositivo conectado (PowerShell):

```powershell
$env:ANDROID_UDID="emulator-5554"; npm run test:android
```

Executar uma única spec:

```bash
npx wdio run ./config/wdio.android.conf.js --spec ./test/specs/login.spec.js
```

### iOS Simulator (macOS)

Descompacte o app de simulador da release em `apps/` (ou defina `IOS_APP_PATH`) e rode:

```bash
npm run test:ios
```

Os locators já trazem a variante iOS (accessibility id, predicate string e class chain).

### BrowserStack (dispositivo real)

1. Copie `.env.example` para `.env` e preencha `BROWSERSTACK_USERNAME` e `BROWSERSTACK_ACCESS_KEY`.
2. Envie o app uma vez e copie o `app_url` retornado (`bs://...`) para `BROWSERSTACK_APP_ID`:

   ```bash
   curl -u "USUARIO:CHAVE" -X POST "https://api-cloud.browserstack.com/app-automate/upload" -F "file=@apps/android.wdio.native.app.apk"
   ```

3. Execute:

   ```bash
   npm run test:browserstack
   ```

## Evidências e relatório

A cada execução, `reports/allure-results` é recriado do zero e recebe:

- **Screenshot ao fim de cada teste** (aprovado ou com falha), nomeado com o status;
- Em falhas: **hierarquia da tela** (XML) e **log do dispositivo** (logcat/syslog);
- **Passos de execução** (cada comando WebDriver, com request/response) e logs de console;
- Aba **Environment** com plataforma, versão do SO, modelo do dispositivo, UDID, Node e host;
- **Categorias** que separam defeito de produto (asserção) de falha de automação/infra.

Logs do Appium e do WebdriverIO ficam em `reports/logs/`.

```bash
npm run report
```

O comando acima gera e abre o relatório; os passos também existem separados (`npm run report:generate` e `npm run report:open`).

## CI/CD

### GitLab CI/CD (`.gitlab-ci.yml`)

Disparado a cada **commit** (push em qualquer branch) e a cada **merge request**:

| Stage | Job | Quando roda |
|---|---|---|
| validate | `validate` (ESLint) | sempre |
| test | `android:emulator` | quando a variável `ANDROID_KVM_RUNNER` = `true` (runner com tag `kvm`) |
| test | `android:browserstack` | quando `BROWSERSTACK_USERNAME` e `BROWSERSTACK_ACCESS_KEY` estão definidas |
| report | `allure-report` | sempre, consolidando os resultados como artefato |

Configuração em **Settings > CI/CD > Variables**:

- `BROWSERSTACK_USERNAME` e `BROWSERSTACK_ACCESS_KEY` (marcadas como *Masked*) para o job em dispositivo real;
- `ANDROID_KVM_RUNNER=true` se houver um runner Linux próprio com `/dev/kvm` e tag `kvm`. Os runners compartilhados
  do GitLab.com não oferecem virtualização aninhada, por isso o emulador depende de runner próprio.

O job de emulador usa [ci/setup-android-emulator.sh](ci/setup-android-emulator.sh) para instalar o SDK, criar o AVD e subir o emulador headless.

### GitHub Actions (`.github/workflows/mobile-tests.yml`)

Mesmo fluxo para quando o repositório está no GitHub: roda lint e a suíte num emulador API 34 a cada push e pull
request, publicando o Allure Report como artefato.

## Boas práticas adotadas

- **Isolamento**: cada teste reabre o app (`terminateApp` + `activateApp`), então nenhum teste depende de outro.
- **Esperas explícitas**: `waitForDisplayed`/`waitUntil` com condição; não há `pause` fixo.
- **Locators centralizados** em `src/locators`, preferindo accessibility id (funciona nas duas plataformas).
- **Dados fora do código** em `test/data/*.json`; e-mails de cadastro gerados por execução para evitar colisão.
- **Credenciais** somente por variáveis de ambiente.
