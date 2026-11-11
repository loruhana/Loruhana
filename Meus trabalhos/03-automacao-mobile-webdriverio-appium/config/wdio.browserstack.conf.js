import { config as shared } from './wdio.shared.conf.js';
import { browserstackCapabilities } from './capabilities.js';

const required = ['BROWSERSTACK_USERNAME', 'BROWSERSTACK_ACCESS_KEY', 'BROWSERSTACK_APP_ID'];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  throw new Error(`Variáveis de ambiente ausentes para o BrowserStack: ${missing.join(', ')}. Veja .env.example.`);
}

export const config = {
  ...shared,
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: 'hub.browserstack.com',
  services: [['browserstack', { browserstackLocal: false, testObservability: false }]],
  capabilities: [browserstackCapabilities()],
};
