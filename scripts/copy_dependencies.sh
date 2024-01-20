#!/bin/bash

mkdir -p ./src/static/examples

cp -r .gen/examples/* ./src/static/examples

cp .gen/wasm_exec.js ./src/static

cp .gen/gdlang.wasm ./src/static

cp .gen/examples.json ./src/static