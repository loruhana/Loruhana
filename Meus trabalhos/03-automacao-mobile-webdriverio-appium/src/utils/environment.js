import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PATHS } from '../../config/app.config.js';

/** Aba "Environment" do Allure, com dados reais da sessão aberta. */
export async function writeAllureEnvironment() {
  const caps = driver.capabilities;
  const props = {
    Plataforma: caps.platformName,
    'Versao do SO': caps.platformVersion || caps['appium:platformVersion'],
    Dispositivo: [caps.deviceManufacturer, caps.deviceModel].filter(Boolean).join(' ') || caps.deviceName || caps['appium:deviceName'],
    'Device UDID': caps.deviceUDID || caps.udid || caps['appium:udid'],
    Automacao: caps.automationName || caps['appium:automationName'],
    App: caps.appPackage || caps['appium:appPackage'] || caps.bundleId || caps['appium:app'],
    Execucao: process.env.BROWSERSTACK_USERNAME && caps['bstack:options'] ? 'BrowserStack' : 'Local',
    'Node.js': process.version,
    'SO do host': `${os.type()} ${os.release()}`,
    CI: process.env.CI ? `${process.env.CI_PIPELINE_ID || process.env.GITHUB_RUN_ID || 'sim'}` : 'nao',
  };

  const content = Object.entries(props)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k.replace(/ /g, '\\ ')}=${v}`)
    .join('\n');

  fs.mkdirSync(PATHS.allureResults, { recursive: true });
  fs.writeFileSync(path.join(PATHS.allureResults, 'environment.properties'), content);
}

/** Separa no relatório falhas de produto (asserção) de falhas de automação. */
export function writeAllureCategories() {
  const categories = [
    { name: 'Defeito de produto (asserção falhou)', matchedStatuses: ['failed'], messageRegex: '.*AssertionError.*' },
    { name: 'Elemento não encontrado / timeout', matchedStatuses: ['failed', 'broken'], messageRegex: '.*(still not displayed|wasn\'t found|not existing|timeout).*' },
    { name: 'Falha de infraestrutura / automação', matchedStatuses: ['broken'] },
  ];
  fs.writeFileSync(path.join(PATHS.allureResults, 'categories.json'), JSON.stringify(categories, null, 2));
}
