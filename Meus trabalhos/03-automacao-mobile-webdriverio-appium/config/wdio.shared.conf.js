import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { PATHS } from './app.config.js';
import { attachTestEvidence } from '../src/utils/evidence.js';
import { writeAllureEnvironment, writeAllureCategories } from '../src/utils/environment.js';

export const config = {
  runner: 'local',
  specs: [path.join(PATHS.root, 'test', 'specs', '**', '*.spec.js')],
  maxInstances: 1,

  logLevel: 'warn',
  outputDir: PATHS.logs,
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 420000,
  connectionRetryCount: 2,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    require: [path.join(PATHS.root, 'test', 'hooks.js')],
  },

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: PATHS.allureResults,
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: true,
        addConsoleLogs: true,
      },
    ],
  ],

  // Limpa resultados anteriores para o relatório refletir somente esta execução.
  onPrepare() {
    fs.rmSync(PATHS.allureResults, { recursive: true, force: true });
    fs.mkdirSync(PATHS.allureResults, { recursive: true });
    fs.mkdirSync(PATHS.logs, { recursive: true });
    writeAllureCategories();
  },

  async before() {
    await writeAllureEnvironment();
  },

  async afterTest(test, context, result) {
    await attachTestEvidence(test, result);
  },
};
