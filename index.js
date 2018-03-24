'use strict';
const path = require('path');
const assetsBuilder = require('./src');

const manifestPath = path.join(
    process.cwd(),
    'assets-builder.yaml',
);

assetsBuilder(manifestPath);
