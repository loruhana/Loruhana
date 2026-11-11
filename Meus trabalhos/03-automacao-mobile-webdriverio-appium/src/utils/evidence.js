import allure from '@wdio/allure-reporter';

const slug = (text) => text.replace(/[^\w-]+/g, '_').slice(0, 80);

/**
 * Evidências anexadas ao Allure ao fim de cada teste:
 * - screenshot sempre (aprovado ou reprovado);
 * - em falha: hierarquia da tela (page source) e log do dispositivo.
 */
export async function attachTestEvidence(test, { passed }) {
  const status = passed ? 'aprovado' : 'FALHA';

  try {
    const png = await driver.takeScreenshot();
    allure.addAttachment(`Screenshot (${status}) - ${slug(test.title)}`, Buffer.from(png, 'base64'), 'image/png');
  } catch (err) {
    allure.addAttachment('Erro ao capturar screenshot', String(err), 'text/plain');
  }

  if (passed) return;

  try {
    allure.addAttachment('Hierarquia da tela no momento da falha', await driver.getPageSource(), 'application/xml');
  } catch (err) {
    allure.addAttachment('Erro ao capturar page source', String(err), 'text/plain');
  }

  try {
    const logType = driver.isIOS ? 'syslog' : 'logcat';
    const entries = await driver.getLogs(logType);
    const lines = entries.slice(-300).map((e) => `${new Date(e.timestamp).toISOString()} ${e.level} ${e.message}`);
    allure.addAttachment(`Log do dispositivo (${logType}, últimas ${lines.length} linhas)`, lines.join('\n'), 'text/plain');
  } catch (err) {
    allure.addAttachment('Log do dispositivo indisponível', String(err), 'text/plain');
  }
}
