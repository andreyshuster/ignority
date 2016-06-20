#!/usr/bin/env node

var fs = require('fs')
, path = require('path')
, process = require('process');

var args = process.argv.slice(2);

var ignores = [];
var save_to_file = false;
var scan_folder = false;
var any_dir = "./";

for (var i=0; i<args.length; i++) {
    if (args[i] == '-s') {
        console.log('Scanning folder');
        scan_folder = true;
        break;
    }
    
    if (args[i] == '-f') {
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

if (scan_folder) {
    fs.readdir(any_dir, function (err, files) {
        if (err) {
            throw err;
        }
        files.map(function (file) {
            return path.join(any_dir, file);
        }).forEach(function (file) {
            var is_file = fs.statSync(file).isFile();
            var is_dir = fs.statSync(file).isDirectory();
            if (/~$/i.test(file)) {
                console.log(file, '(Emacs)');
            }
            if (/node_modules/.test(file)) {
                console.log(file, '(Node modules)');
            }
            if (/npm-debug.log/i.test(file)) {
                console.log(file, '(Npm debug log)');
            }
            // console.log("%s (%s) (%s)", file, path.extname(file),
            //             is_file ? "File" : "Directory");
        });
    });
    
}

// if (ignores.length == 0) {
//     console.log('No items added');
//     process.exit(0);
// }

if (save_to_file) {
    fs.writeFile(".gitignore", ignores.join("\n"), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Changes saved");
        return 'ok';
    }); 
}
