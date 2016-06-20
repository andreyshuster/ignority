#!/usr/bin/env node

var fs = require('fs')
, path = require('path')
, process = require('process');

var args = process.argv.slice(2);

var ignores = [];
var save_to_file = false;

for (var i=0; i<args.length; i++) {
    if (args[i].toLowerCase() == '-f') {
        save_to_file = true;
    }
    if (args[i].toLowerCase() == 'emacs') {
        ignores.push('*~');
        console.log('*~');
    }
    if (args[i].toLowerCase() == 'node') {
        ignores.push('node_modules');
        console.log("node_modules");
    }
} 

if (ignores.length == 0) {
    console.log('No items added');
    process.exit(0);
}

if (!save_to_file) {
    process.exit(0);
}

fs.writeFile(".gitignore", ignores.join("\n"), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Changes saved");
}); 

