'use strict';
const fs = require('fs');
const path = require('path');
const Manifest = require('./manifest');
const msgpack = require('./format/msgpack');


/**
 * @param {string} manifestPath 
 */
module.exports = function assetsBuilder(manifestPath) {

    const manifest = new Manifest(manifestPath);

    function readdir(dir) {
        return fs.readdirSync(
            path.join(manifest.schemaBaseDir, dir),
        ).reduce((files, file) => {
            const filepath = path.join(dir, file);
            if (fs.statSync(path.join(manifest.schemaBaseDir, filepath)).isDirectory()) {
                return files.concat(readdir(filepath));
            }
            if (fs.statSync(path.join(manifest.schemaBaseDir, filepath)).isFile() && /.+\.(yaml|yml)$/.test(file)) {
                return files.concat([manifest.getSchema(filepath)]);
            }
            return files;
        }, []);
    }

    const resolver = fs.readFileSync(
        path.join(__dirname, 'format', 'templates', 'Resolver.js'),
        'utf8',
    );
    fs.writeFileSync(
        path.join(manifest.outputSourceDir, 'Resolver.js'),
        resolver,
    );

    readdir('').forEach((schema) => {
        switch (schema.handler.format) {
            case 'msgpack':
                msgpack(manifest, schema);
                break;
        }
    });

}
