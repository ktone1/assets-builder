'use strict';
const path = require('path');
const XLSX = require('xlsx');
const Worksheet = require('./worksheet');


module.exports = class Workbook {
    /**
     * constructor
     * @param {object} context 
     * @param {string} xlsxName 
     */
    constructor(context, xlsxName) {
        this.xlsxName = xlsxName;
        this.filePath = path.join(context.xlsxBaseDir, xlsxName + '.xlsx');
        this._context = context;
        this._workbook = XLSX.readFile(this.filePath);
        this._worksheets = {};
    }

    /**
     * @param {string} sheetName 
     * @returns {Worksheet}
     */
    getWorksheet(sheetName) {
        if (this._worksheets[sheetName] == undefined) {
            this._worksheets[sheetName] = new Worksheet(
                sheetName,
                this._workbook.Sheets[sheetName],
            );
        }
        return this._worksheets[sheetName];
    }

}
