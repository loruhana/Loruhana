import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Identificadores do native-demo-app em cada plataforma.
 * Usados para relançar o app entre os testes e como fallback quando
 * não há binário local (app já instalado no dispositivo).
 */
export const APP = {
  android: {
    package: 'com.wdiodemoapp',
    activity: '.MainActivity',
    binary: process.env.ANDROID_APP_PATH || path.join(ROOT, 'apps', 'android.wdio.native.app.apk'),
  },
  ios: {
    bundleId: 'org.reactjs.native.example.wdiodemoapp',
    binary: process.env.IOS_APP_PATH || path.join(ROOT, 'apps', 'ios.simulator.wdio.native.app.app'),
  },
};

export const PATHS = {
  root: ROOT,
  allureResults: path.join(ROOT, 'reports', 'allure-results'),
  logs: path.join(ROOT, 'reports', 'logs'),
};

export const binaryExists = (file) => fs.existsSync(file);
