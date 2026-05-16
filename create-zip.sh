#!/bin/bash
zipFile="myt_firefox.zip"

files=(
    "./src" 		 \
    "./icons" 		 \
    "manifest.json"	 \
    "package-lock.json" \
    "package.json"	 \
    "README.md"
)

echo "Files: ${files[@]}"
zip -r -f "$zipFile" ${files[@]}
echo "Created zip $zipFile"
