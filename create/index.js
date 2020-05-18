'use strict';

const path = require('path');
const fs = require('fs-extra');
const yargs = require('yargs');

const argv = yargs.argv;

const name = argv.name;
const dirname = path.dirname(__dirname);
fs.copySync(path.join(dirname, 'create/template/'), path.join(dirname, `src/page/${name}/`));