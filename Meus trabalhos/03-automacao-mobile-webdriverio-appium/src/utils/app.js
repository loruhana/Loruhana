import { APP } from '../../config/app.config.js';

const appId = () => (driver.isIOS ? APP.ios.bundleId : APP.android.package);

/** Encerra e reabre o app para isolar o estado de cada teste. */
export async function relaunchApp() {
  await driver.terminateApp(appId());
  await driver.activateApp(appId());
  await $('~Home-screen').waitForDisplayed({ timeout: 20000 });
}
