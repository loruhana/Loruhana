import { APP, binaryExists } from './app.config.js';

const env = process.env;

/**
 * Android (emulador ou dispositivo local) via UiAutomator2.
 * Se o .apk existir em apps/ (ou ANDROID_APP_PATH), ele é instalado;
 * caso contrário, o app já instalado no dispositivo é aberto pelo pacote.
 */
export function androidCapabilities() {
  const appSource = binaryExists(APP.android.binary)
    ? { 'appium:app': APP.android.binary }
    : { 'appium:appPackage': APP.android.package, 'appium:appActivity': APP.android.activity };

  return {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': env.ANDROID_DEVICE_NAME || 'Android Emulator',
    ...(env.ANDROID_UDID ? { 'appium:udid': env.ANDROID_UDID } : {}),
    ...(env.ANDROID_PLATFORM_VERSION ? { 'appium:platformVersion': env.ANDROID_PLATFORM_VERSION } : {}),
    ...appSource,
    'appium:noReset': false,
    'appium:newCommandTimeout': 240,
    'appium:uiautomator2ServerInstallTimeout': 120000,
    'appium:adbExecTimeout': 60000,
    'appium:androidInstallTimeout': 300000,
  };
}

/** iOS Simulator via XCUITest (requer macOS + Xcode). */
export function iosCapabilities() {
  return {
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:deviceName': env.IOS_DEVICE_NAME || 'iPhone 16',
    'appium:platformVersion': env.IOS_PLATFORM_VERSION || '18.5',
    'appium:app': APP.ios.binary,
    'appium:noReset': false,
    'appium:newCommandTimeout': 240,
    'appium:wdaLaunchTimeout': 180000,
  };
}

/** Dispositivo real no BrowserStack App Automate. */
export function browserstackCapabilities() {
  return {
    platformName: env.BROWSERSTACK_PLATFORM || 'Android',
    'appium:app': env.BROWSERSTACK_APP_ID,
    'bstack:options': {
      deviceName: env.BROWSERSTACK_DEVICE || 'Samsung Galaxy S23',
      platformVersion: env.BROWSERSTACK_OS_VERSION || '13.0',
      projectName: 'Automacao Mobile - native-demo-app',
      buildName: env.BROWSERSTACK_BUILD_NAME || `build-local-${new Date().toISOString().slice(0, 10)}`,
      sessionName: 'Suíte de regressão',
      appiumVersion: '2.19.0',
      deviceLogs: true,
      networkLogs: false,
    },
  };
}
