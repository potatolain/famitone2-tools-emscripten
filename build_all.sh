#!/bin/sh

cd ./shiru-tools/nesasmc
emcc nesasmc.cpp -o nesasmc.js -s USE_ZLIB=1 -s EXPORTED_RUNTIME_METHODS="['FS', 'callMain']" -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s EXPORT_NAME='createModule' -s USE_ES6_IMPORT_META=0
cd ../nsf2data
emcc nsf2data.cpp -o nsf2data.js -s USE_ZLIB=1 -s EXPORTED_RUNTIME_METHODS="['FS', 'callMain']" -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s EXPORT_NAME='createModule' -s USE_ES6_IMPORT_META=0
cd ../text2data
emcc text2datac.cpp -o text2data.js -s USE_ZLIB=1 -s EXPORTED_RUNTIME_METHODS="['FS', 'callMain']" -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s EXPORT_NAME='createModule' -s USE_ES6_IMPORT_META=0