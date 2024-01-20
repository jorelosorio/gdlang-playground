#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [version]"
    exit 1
fi

GDLangVersion=$1

URL=https://github.com/jorelosorio/gdlang/releases/download/v${GDLangVersion}/gdlang_${GDLangVersion}_js_wasm.tar.gz

echo "Downloading $URL.."

wget -P .downloads $URL

tar -xzf .downloads/gdlang_${GDLangVersion}_js_wasm.tar.gz -C .gen

rm .downloads/gdlang_${GDLangVersion}_js_wasm.tar.gz