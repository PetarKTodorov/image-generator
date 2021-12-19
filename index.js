import { readFile } from 'fs/promises';

import init from './src/main.js';

(async function() {
    const settings = JSON.parse(await readFile("settings.json", "utf8"));

    await init(settings);
})();
