import {createRequire} from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const sanitize = require("sanitize-filename");
import { getJsonName } from '../utils.js';

const defaultLocalDir = 'data/reports/';

export default (jsonPath, uid = '', localDir = defaultLocalDir) => {
  // user subdir if uid
  if (uid) {
    const userDir = sanitize(uid.slice(0, 5));
    localDir += userDir + '/';
    if (!fs.existsSync(localDir)) fs.mkdirSync(localDir);
  }

  // remove microseconds if available
  const jsonNameLong = getJsonName(jsonPath);
  const jsonNameShort = getJsonName(jsonPath, true);
  const jsonName = fs.existsSync(localDir + jsonNameShort) ? jsonNameLong : jsonNameShort;

  // copy json file
  const localPath = localDir + jsonName;
  fs.copyFileSync(jsonPath, localPath);

  return { jsonName, localPath };
};
