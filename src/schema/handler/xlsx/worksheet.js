'use strict';
const XLSX = require('xlsx');
const Cell = require('./cell');


module.exports = class Worksheet {
    /**
     * @param {string} sheetName 
     * @param {object} worksheet 
     */
    constructor(sheetName, worksheet) {
        this.sheetName = sheetName;
        this._worksheet = worksheet;
        this._range = XLSX.utils.decode_range(worksheet['!ref']);
    }

    get startCol() {
        return this._range.s.c;
    }

    get endCol() {
        return this._range.e.c;
    }

    get endRow() {
        return this._range.e.r;
    }

    /**
     * @param {number} colNum 
     * @param {number} rowNum 
     */
    getCell(colNum, rowNum) {
        return new Cell(this._worksheet, colNum, rowNum);
    }
}
