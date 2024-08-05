#!/bin/sh

# Usage: build_tool filename
build_tool () {
    echo Starting build of $1
    cd $1
    emcc $1.cpp -o $1.js -s USE_ZLIB=1 -s EXPORTED_RUNTIME_METHODS="['FS', 'callMain']" -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s EXPORT_NAME='createModule' -s USE_ES6_IMPORT_META=0 -s EXIT_RUNTIME=1
    cp $1.js ../../dist/emscripten
    cp $1.wasm ../../dist/emscripten
    cd ..
    echo Build of $1 completed successfully.
}
mkdir -p dist/emscripten
cd shiru-tools
build_tool nesasmc
build_tool nsf2data
build_tool text2data

cp wrappers/* dist/