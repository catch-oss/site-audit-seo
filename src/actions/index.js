// actions runs after scan

import copyJsonToReports from './copyJsonToReports.js';
import publishGoogleDrive from './publishGoogleDrive.js';
import saveAsJson from './saveAsJson.js';
import saveAsXlsx from './saveAsXlsx.js';
import startViewer from './startViewer.js';
import uploadJson from './uploadJson.js';

export default {
  copyJsonToReports,
  publishGoogleDrive,
  saveAsJson,
  saveAsXlsx,
  startViewer,
  uploadJson
};
