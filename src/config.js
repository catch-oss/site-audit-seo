import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import fs from 'fs';
import os from 'os';

let config = {};
const homedir = os.homedir();
const configPath = `${homedir}/.site-audit-seo.conf.js`;
if (fs.existsSync(configPath)) {
  config = require(configPath);
}

export default config;
