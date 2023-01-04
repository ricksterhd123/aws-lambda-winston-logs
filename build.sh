#!/bin/bash
set -e

mkdir -p build
cp index.js build/
cp package-lock.json build/
cp package.json build/
cd build
npm install
cd ..
