'use strict';


module.exports = class Relation {
    /**
     * constructor
     * @param {object} field 
     * @param {object} relation 
     */
    constructor(field, relation) {
        this.column = field.column;
        this.key = relation.key || field.column;
        this.schemaPath = relation.schemaPath;
        this.schema = field.schema.manifest.getSchema(this.schemaPath);
    }

    get className() {
        return this.schema.handler.className;
    }

    getId(value) {
        const row = this.schema.handler.find(this.key, value);
        return row[this.schema.primary.column];
    }
}
