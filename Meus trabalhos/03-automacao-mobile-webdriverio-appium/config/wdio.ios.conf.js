import { config as shared } from './wdio.shared.conf.js';
import { iosCapabilities } from './capabilities.js';
import { PATHS } from './app.config.js';

// Requer macOS com Xcode e um simulador iOS disponível.
export const config = {
  ...shared,
  port: 4723,
  services: [['appium', { logPath: PATHS.logs }]],
  capabilities: [iosCapabilities()],
};
