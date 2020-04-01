// ------------------------------------------------------------------------------------------------
// Post-build script: creates version.json and package.json in /dist folder
// Version: 1.0.1
// ------------------------------------------------------------------------------------------------

const fs = require('fs');
const distDir = './dist';
const packageJson = require('../package.json');

// ------------------------------------------------------------------------------------------------
// create version.json
// ------------------------------------------------------------------------------------------------
const versionJson = {
    applicationName: packageJson.name,
    version: packageJson.version,
    buildTimestamp: (new Date()).toISOString(),
    info: 'Node Application'
};

const versionJsonStr = JSON.stringify( versionJson, null, 2 );


const versionJsonFilePath = distDir + '/version.json';

fs.writeFileSync( versionJsonFilePath, versionJsonStr );

// ------------------------------------------------------------------------------------------------
// create package.json
// ------------------------------------------------------------------------------------------------

// start with regular package.json
const distPackageJson = {
    ...packageJson
};
// remove dist and devDependencies
delete distPackageJson.scripts;
delete distPackageJson.devDependencies;
// correct entry points
distPackageJson.main = 'index.js';
distPackageJson.types = 'index.d.ts';

// export
const distPackageJsonFilePath = distDir + '/package.json';
const distPackageJsonStr = JSON.stringify( distPackageJson, null, 2 );
fs.writeFileSync( distPackageJsonFilePath, distPackageJsonStr );
