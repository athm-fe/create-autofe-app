#!/usr/bin/env node

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');
var chalk = require('chalk');
var semver = require('semver');
var argv = require('minimist')(process.argv.slice(2));
var pathExists = require('path-exists');

/**
 * Arguments:
 *   --version - to print current version
 *   --verbose - to print logs while init
 *   --scripts-version <alternative package>
 *     Example of valid values:
 *     - a specific npm version: "0.2.0"
 *     - a .tgz archive from any npm repo: "https://registry.npmjs.org/autofe-scripts/-/autofe-scripts-0.2.0.tgz"
 *     - a package prepared with `tasks/clean_pack.sh`: "/Users/home/jpuncle/create-autofe-app/autofe-scripts-0.2.0.tgz"
 */
var commands = argv._;
if (commands.length === 0) {
  if (argv.version) {
    console.log('create-autofe-app version: ' + require('./package.json').version);
    process.exit();
  }
  console.error(
    'Usage: create-autofe-app <project-directory> [--verbose]'
  );
  process.exit(1);
}

createApp(commands[0], argv.verbose, argv['scripts-version']);

function createApp(name, verbose, version) {
  var root = path.resolve(name);
  var appName = path.basename(root);

  checkAppName(appName);

  if (!pathExists.sync(name)) {
    fs.mkdirSync(root);
  } else if (!isSafeToCreateProjectIn(root)) {
    console.log('The directory `' + name + '` contains file(s) that could conflict. Aborting.');
    process.exit(1);
  }

  console.log(
    'Creating a new AutoFE app in ' + root + '.'
  );
  console.log();

  var packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
  };
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  var originalDirectory = process.cwd();
  process.chdir(root);

  console.log('Installing packages. This might take a couple minutes.');
  console.log('Installing autofe-scripts...');
  console.log();

  run(root, appName, version, verbose, originalDirectory);
}

function install(packageToInstall, verbose, callback) {
  var args = [
    'add',
    '--dev',
    '--exact',
    packageToInstall
  ];
  var proc = spawn('yarn', args, {stdio: 'inherit'});

  var yarnExists = true;
  proc.on('error', function (err) {
    if (err.code === 'ENOENT') {
      yarnExists = false;
    }
  });
  proc.on('close', function (code) {
    if (yarnExists) {
      callback(code, 'yarn', args);
      return;
    }
    // No Yarn installed, continuing with npm.
    args = [
      'install',
      verbose && '--verbose',
      '--save-dev',
      '--save-exact',
      packageToInstall
    ].filter(function(e) { return e; });
    var npmProc = spawn('npm', args, {stdio: 'inherit'});
    npmProc.on('close', function (code) {
      callback(code, 'npm', args);
    });
  });
}

function run(root, appName, version, verbose, originalDirectory) {
  var packageToInstall = getInstallPackage(version);
  var packageName = getPackageName(packageToInstall);

  install(packageToInstall, verbose, function (code, command, args) {
    if (code !== 0) {
      console.error('`' + command + ' ' + args.join(' ') + '` failed');
      return;
    }

    checkNodeVersion(packageName);

    var scriptsPath = path.resolve(
      process.cwd(),
      'node_modules',
      packageName,
      'scripts',
      'init.js'
    );
    var init = require(scriptsPath);
    init(root, appName, verbose, originalDirectory);
  });
}

function getInstallPackage(version) {
  var packageToInstall = 'autofe-scripts';
  var validSemver = semver.valid(version);
  if (validSemver) {
    packageToInstall += '@' + validSemver;
  } else if (version) {
    // for tar.gz or alternative paths
    packageToInstall = version;
  }
  return packageToInstall;
}

// Extract package name from tarball url or path.
function getPackageName(installPackage) {
  if (installPackage.indexOf('.tgz') > -1) {
    // The package name could be with or without semver version, e.g. autofe-scripts-0.2.0-alpha.1.tgz
    // However, this function returns package name only wihout semver version.
    return installPackage.match(/^.+\/(.+?)(?:-\d+.+)?\.tgz$/)[1];
  } else if (installPackage.indexOf('@') > 0) {
    // Do not match @scope/ when stripping off @version or @tag
    return installPackage.charAt(0) + installPackage.substr(1).split('@')[0];
  }
  return installPackage;
}

function checkNodeVersion(packageName) {
  var packageJsonPath = path.resolve(
    process.cwd(),
    'node_modules',
    packageName,
    'package.json'
  );
  var packageJson = require(packageJsonPath);
  if (!packageJson.engines || !packageJson.engines.node) {
    return;
  }

  if (!semver.satisfies(process.version, packageJson.engines.node)) {
    console.error(
      chalk.red(
        'You are currently running Node %s but create-autofe-app requires %s.' +
        ' Please use a supported version of Node.\n'
      ),
      process.version,
      packageJson.engines.node
    );
    process.exit(1);
  }
}

function checkAppName(appName) {
  // TODO: there should be a single place that holds the dependencies
  var dependencies = [];
  var devDependencies = ['autofe-scripts'];
  var allDependencies = dependencies.concat(devDependencies).sort();

  if (allDependencies.indexOf(appName) >= 0) {
    console.error(
      chalk.red(
        'We cannot create a project called `' + appName + '` because a dependency with the same name exists.\n' +
        'Due to the way npm works, the following names are not allowed:\n\n'
      ) +
      chalk.cyan(
        allDependencies.map(function(depName) {
          return '  ' + depName;
        }).join('\n')
      ) +
      chalk.red('\n\nPlease choose a different project name.')
    );
    process.exit(1);
  }
}

// If project only contains files generated by GH, it’s safe.
// We also special case IJ-based products .idea because it integrates with CRA:
// https://github.com/facebookincubator/create-react-app/pull/368#issuecomment-243446094
function isSafeToCreateProjectIn(root) {
  var validFiles = [
    '.DS_Store', 'Thumbs.db', '.git', '.gitignore', '.idea', 'README.md', 'LICENSE'
  ];
  return fs.readdirSync(root)
    .every(function(file) {
      return validFiles.indexOf(file) >= 0;
    });
}
