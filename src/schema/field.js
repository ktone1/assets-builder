'use strict';
const Relation = require('./relation');


module.exports = class Field {
    /**
     * @param {object} schema 
     * @param {object} field 
     */
    constructor(schema, field) {
        this.schema = schema;
        this.fieldData = field;
    }

    /**
     * @returns {boolean}
     */
    isPrimary() {
        return this.fieldData['primary'] != undefined && this.fieldData.primary;
    }

    /**
     * @returns {Relation|null}
     */
    get relation() {
        if (this.type != 'foreignkey') {
            return null;
        }
        return new Relation(this, this.fieldData.relation);
    }

    /**
     * @returns {string}
     */
    get column() {
        return this.fieldData.column;
    }

    /**
     * @returns {string}
     */
    get target() {
        if (this.fieldData['target'] != undefined) {
            return this.fieldData.target;
        }
        return this.fieldData.column;
    }

    /**
     * @returns {string}
     */
    get type() {
        return this.fieldData.type;
    }

}
