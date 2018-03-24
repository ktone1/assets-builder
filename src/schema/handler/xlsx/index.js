'use strict';
const Parser = require('./parser');


function classify(str) {
    return str.split('_').map(
        function (s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        }
    ).join('');
}


module.exports = class Handler {
    constructor(schema, parser) {
        this.schema = schema;
        this.handlerData = schema.schemaData.handler;
        this._workbook = parser.getWorkbook(this._xlsxName);
        this._worksheet = this._workbook.getWorksheet(this._sheetName);
        this._indexes = {};
        this._object = this._toObject();
    }

    all() {
        return this._object;
    }

    get format() {
        return this.handlerData.format;
    }

    get className() {
        return classify(this._xlsxName) + classify(this._sheetName);
    }

    find(columnName, value) {
        if (this._indexes[columnName] == undefined) {
            this._indexes[columnName] = {};
            this._object.forEach(row => {
                this._indexes[columnName][row[columnName]] = row;
            });
        }
        if (this._indexes[columnName][value] == undefined) {
            throw `not found ${columnName} = ${value} in ${this._sheetPath}`;
        }
        return this._indexes[columnName][value];
    }

    get _xlsxName() {
        return this.handlerData.xlsxName;
    }

    get _sheetName() {
        return this.handlerData.sheetName;
    }

    get _startRow(){
        return this.handlerData.startRow;
    }

    get _endRow() {
        return this._worksheet.endRow;
    }

    get _startCol() {
        return this._worksheet.startCol;
    }

    get _endCol() {
        return this._worksheet.endCol;
    }

    get _sheetPath() {
        return `[${this._xlsxName}.xlsx]${this._sheetName}`;
    }

    _toObject() {
        let data = [];
        for (let r = this._startRow - 1; r <= this._endRow; r++) {
            data.push(this._rowToObject(r));
        }
        return data;
    }

    _rowToObject(rowNum) {
        return this.schema.fields.reduce(
            (prev, field) => {
                prev[field.column] = this._getValue(field, rowNum);
                return prev;
            },
            {}, 
        )
    }

    _getValue(field, rowNum) {
        const cell = this._getCell(this._getColNum(field.target), rowNum);
        if (!cell.exist()) {
            return null;
        }
        if (field.type == 'foreignkey') {
            return field.relation.getId(cell.value);
        } else {
            if (field.type != cell.type) {
                throw `value type not ${field.type}: ${this._sheetPath}!${cell.address}`;
            }
            return cell.value;
        }
    }

    _getCell(colNum, rowNum) {
        return this._worksheet.getCell(colNum, rowNum);
    }

    _getColNum(columnName) {
        if (this._columns == undefined) {
            this._columns = {};
            for (let c = this._startCol; c <= this._endCol; c++) {
                const cell = this._getCell(c, this._startRow - 2);
                if (cell.exist()) {
                    this._columns[cell.value] = c;
                }
            };
        }
        return this._columns[columnName];
    }

}
