'use strict';
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const Field = require('./field');
const XLSXHandler = require('./handler/xlsx');


module.exports = class Schema {
    /**
     * constructor
     * @param {object} manifest 
     * @param {string} schemaBaseDir 
     * @param {string} xlsxName 
     * @param {string} schemaFile 
     */
    constructor(manifest, schemaPath) {
        this.manifest = manifest;
        this.schemaPath = schemaPath;
        this.schemaData = yaml.safeLoad(
            fs.readFileSync(
                path.join(manifest.schemaBaseDir, schemaPath),
                'utf8',
            ),
        );

        this.fields = this.schemaData.fields.map((field) => {
            return new Field(this, field);
        });

        this.primary = this.fields.find((field) => field.isPrimary());
        if (this.primary == undefined) {
            throw `not found primary key: ${this.schemaPath}`;
        }

        if (this.schemaData.handler.type == 'xlsx') {
            this.handler = new XLSXHandler(
                this,
                this.manifest.xlsxParser,
            );
        } else {
            throw `this handler type not supported: ${this.schemaData.handler.type}`;
        }
    }

    get className() {
        return this.handler.className;
    }
}
