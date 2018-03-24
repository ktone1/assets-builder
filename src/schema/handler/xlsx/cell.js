'use strict';
const XLSX = require('xlsx');


module.exports = class Cell {
    /**
     * constructor
     * @param {object} worksheet 
     * @param {number} colNum 
     * @param {number} rowNum 
     */
    constructor(worksheet, colNum, rowNum) {
        this._worksheet = worksheet;
        this.colNum = colNum;
        this.rowNum = rowNum;
        this.address = XLSX.utils.encode_cell({
            c: colNum,
            r: rowNum,
        });
    }

    exist() {
        return this._worksheet[this.address] != undefined;
    }

    get type() {
        switch (this._worksheet[this.address].t) {
            case 'n':
                return 'number';
            case 's':
                return 'string';
            case 'b':
                return 'boolean';
            case 'd':
                return 'date';
        }
        return 'unknown';
    }

    get value() {
        return this._worksheet[this.address].v;
    }
}
