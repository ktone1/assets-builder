'use strict';
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const Schema = require('./schema');
const XLSXParser = require('./schema/handler/xlsx/parser');


module.exports = class Manifest {
    /**
     * constructor
     * @param {string} schemaBaseDir 
     */
    constructor(manifestPath) {
        this.manifestPath = manifestPath;
        this.data = yaml.safeLoad(fs.readFileSync(this.manifestPath, 'utf8'));
        this.xlsxParser = new XLSXParser(this.xlsxBaseDir);
        this._schemas = {};
    }

    /**
     * @param {string} schemaPath
     * @returns {Schema}
     */
    getSchema(schemaPath) {
        if (this._schemas[schemaPath] == undefined) {
            this._schemas[schemaPath] = new Schema(this, schemaPath);
        }
        return this._schemas[schemaPath];
    }

    get assetsEndpoint() {
        return this.data.assetsEndpoint;
    }

    get outputAssetsDir() {
        return path.resolve(
            path.dirname(this.manifestPath),
            this.data.outputAssetsDir,
        );
    }

    get outputSourceDir() {
        return path.resolve(
            path.dirname(this.manifestPath),
            this.data.outputSourceDir,
        );
    }

    get schemaBaseDir() {
        return path.resolve(
            path.dirname(this.manifestPath),
            this.data.schemaBaseDir,
        );
    }

    get xlsxBaseDir() {
        return path.resolve(
            path.dirname(this.manifestPath),
            this.data.xlsxBaseDir,
        );
    }
}
