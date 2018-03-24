'use strict';
const path = require('path');
const fs = require('fs');
const msgpack = require('msgpack-lite');
const ejs = require('ejs');

const msgpack_template = ejs.compile(
    fs.readFileSync(
        path.join(__dirname, 'templates', 'msgpack.js.ejs'),
        'utf8',
    )
);

module.exports = function Format(manifest, schema) {
    const data = schema.handler.all().map((row) => {
        return schema.fields.map((field) => {
            return row[field.column];
        });
    });
    const asset = msgpack.encode(data);
    const source = msgpack_template({
        schema: schema,
        assetsEndpoint: manifest.assetsEndpoint,
    });

    fs.writeFileSync(
        path.join(manifest.outputAssetsDir, schema.className + '.bat'),
        asset,
    );

    fs.writeFileSync(
        path.join(manifest.outputSourceDir, schema.className + '.js'),
        source,
    );
}
