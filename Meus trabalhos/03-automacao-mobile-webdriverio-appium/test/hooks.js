import { relaunchApp } from '../src/utils/app.js';

// Root hooks do Mocha: executam antes dos beforeEach de cada spec,
// garantindo que todo teste comece com o app recém-aberto na Home.
export const mochaHooks = {
  async beforeEach() {
    await relaunchApp();
  },
};
