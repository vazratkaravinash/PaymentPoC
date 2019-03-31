#!/bin/bash
echo "Deploying Hospital Contract... $PWD"
echo "{}" > ../config/contractAddress.json
node deploy.js
