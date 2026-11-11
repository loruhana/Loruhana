import fs from 'node:fs';
import path from 'node:path';
import { PATHS } from '../../config/app.config.js';

/** Carrega um arquivo de massa de dados de test/data (ex.: loadData('auth')). */
export function loadData(name) {
  const file = path.join(PATHS.root, 'test', 'data', `${name}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

/** Gera um e-mail único por execução para cadastros sem colisão. */
export function uniqueEmail(prefix) {
  const stamp = `${Date.now().toString(36)}${Math.floor(Math.random() * 1e4)}`;
  return `${prefix}+${stamp}@mobile-tests.dev`;
}
