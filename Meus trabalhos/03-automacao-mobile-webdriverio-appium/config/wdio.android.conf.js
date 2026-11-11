import { config as shared } from './wdio.shared.conf.js';
import { androidCapabilities } from './capabilities.js';
import { PATHS } from './app.config.js';

export const config = {
  ...shared,
  port: 4723,
  services: [['appium', { logPath: PATHS.logs, args: { relaxedSecurity: true } }]],
  capabilities: [androidCapabilities()],
};
