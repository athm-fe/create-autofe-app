#!/usr/bin/env node

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// create-react-app is installed globally on people's computers. This means
// that it is extremely difficult to have them upgrade the version and
// because there's only one global version installed, it is very prone to
// breaking changes.
//
// The only job of create-react-app is to init the repository and then
// forward all the commands to the local version of create-react-app.
//
// If you need to add a new command, please add it to the scripts/ folder.
//
// The only reason to modify this file is to add more warnings and
// troubleshooting information for the `create-react-app` command.
//
// Do not make breaking changes! We absolutely don't want to have to
// tell people to update their global version of create-react-app.
//
// Also be careful with new language features.
// This file must work on Node 0.10+.
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const chalk = require('chalk');
const commander = require('commander');
const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');
const semver = require('semver');

const packageInfo = require('./package.json');

let projectName;

const program = new commander.Command(packageInfo.name)
  .version(packageInfo.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action((name) => {
    projectName = name;
  })
  .option(
    '--verbose',
    'print additional logs')
  .option(
    '--scripts-version <alternative-package>',
    'use a non-standard version of autofe-scripts')
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`    Only ${chalk.green('<project-directory>')} is required.`);
    console.log();
    console.log(`    A custom ${chalk.cyan('--scripts-version')} can be one of:`);
    console.log(`      - a specific npm version: ${chalk.green('0.8.2')}`);
    console.log(`      - a custom fork published on npm: ${chalk.green('my-autofe-scripts')}`);
    console.log(`      - a .tgz archive: ${chalk.green('https://mysite.com/my-autofe-scripts-0.8.2.tgz')}`);
    console.log('    It is not needed unless you specifically want to use a fork.');
    console.log();
    console.log('    If you have any problems, do not hesitate to file an issue:');
    console.log(`      ${chalk.cyan('https://github.com/athm-fe/create-autofe-app/issues/new')}`);
    console.log();
  })
  .parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`);
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-app')}`);
  console.log();
  console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
  process.exit(1);
}

createApp(projectName, program.verbose, program.scriptsVersion);

function createApp(name, verbose, version) {
  const root = path.resolve(name);
  const appName = path.basename(root);

  checkAppName(appName);
  fs.ensureDirSync(name);
  if (!isSafeToCreateProjectIn(root)) {
    console.log(`The directory ${chalk.green(name)} contains files that could conflict.`);
    console.log('Try using a new directory name.');
    process.exit(1);
  }

  console.log(`Creating a new AutoFE app in ${chalk.green(root)}.`);
  console.log();

  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
  };
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson, null, 2));
  const originalDirectory = process.cwd();
  process.chdir(root);

  console.log('Installing packages. This might take a couple minutes.');
  console.log('Installing autofe-scripts...');
  console.log();

  run(root, appName, version, verbose, originalDirectory);
}

function shouldUseYarn() {
  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function install(packageToInstall, verbose, callback) {
  const useYarn = shouldUseYarn();
  let command;
  let args;
  if (useYarn) {
    command = 'yarn';
    args = [
      'add',
      '--dev',
      '--exact',
      packageToInstall,
    ];
  } else {
    command = 'npm';
    args = [
      'install',
      '--save-dev',
      '--save-exact',
      '--sass-binary-site=https://npm.taobao.org/mirrors/node-sass/',
      '--loglevel',
      'error',
      packageToInstall,
    ];
  }

  if (verbose) {
    args.push('--verbose');
  }

  const child = spawn(command, args, { stdio: 'inherit' });
  child.on('close', (code) => {
    callback(code, command, args);
  });
}

function run(root, appName, version, verbose, originalDirectory) {
  const packageToInstall = getInstallPackage(version);
  const packageName = getPackageName(packageToInstall);

  install(packageToInstall, verbose, (code, command, args) => {
    if (code !== 0) {
      console.error(`${command} ${args.join(' ')} failed`);
      return;
    }

    checkNodeVersion(packageName);

    const scriptsPath = path.resolve(
      process.cwd(),
      'node_modules',
      packageName,
      'scripts',
      'init.js',
    );
    const init = require(scriptsPath);
    init(root, appName, verbose, originalDirectory);
  });
}

function getInstallPackage(version) {
  let packageToInstall = 'autofe-scripts';
  const validSemver = semver.valid(version);
  if (validSemver) {
    packageToInstall += `@${validSemver}`;
  } else if (version) {
    // for tar.gz or alternative paths
    packageToInstall = version;
  }
  return packageToInstall;
}

// Extract package name from tarball url or path.
function getPackageName(installPackage) {
  if (installPackage.indexOf('.tgz') > -1) {
    // The package name could be with or without semver version,
    // e.g. autofe-scripts-0.2.0-alpha.1.tgz
    // However, this function returns package name only wihout semver version.
    return installPackage.match(/^.+\/(.+?)(?:-\d+.+)?\.tgz$/)[1];
  } else if (installPackage.indexOf('@') > 0) {
    // Do not match @scope/ when stripping off @version or @tag
    return installPackage.charAt(0) + installPackage.substr(1).split('@')[0];
  }
  return installPackage;
}

function checkNodeVersion(packageName) {
  const packageJsonPath = path.resolve(
    process.cwd(),
    'node_modules',
    packageName,
    'package.json',
  );
  const packageJson = require(packageJsonPath);
  if (!packageJson.engines || !packageJson.engines.node) {
    return;
  }

  if (!semver.satisfies(process.version, packageJson.engines.node)) {
    console.error(
      chalk.red(
        'You are running Node %s.\n' +
          'Create AutoFE App requires Node %s or higher. \n' +
          'Please update your version of Node.'),
      process.version,
      packageJson.engines.node,
    );
    process.exit(1);
  }
}

function checkAppName(appName) {
  // TODO: there should be a single place that holds the dependencies
  const dependencies = [];
  const devDependencies = ['autofe-scripts'];
  const allDependencies = dependencies.concat(devDependencies).sort();

  if (allDependencies.indexOf(appName) >= 0) {
    console.error(
      chalk.red(
        `We cannot create a project called ${chalk.green(appName)}
        because a dependency with the same name exists.\n
        Due to the way npm works, the following names are not allowed:\n\n`) +
      chalk.cyan(allDependencies.map(depName => `  ${depName}`).join('\n')) +
      chalk.red('\n\nPlease choose a different project name.'));
    process.exit(1);
  }
}

// If project only contains files generated by GH, it’s safe.
// We also special case IJ-based products .idea because it integrates with CRA:
// https://github.com/facebookincubator/create-react-app/pull/368#issuecomment-243446094
function isSafeToCreateProjectIn(root) {
  const validFiles = [
    '.DS_Store',
    'Thumbs.db',
    '.git',
    '.gitignore',
    '.idea',
    'README.md',
    'LICENSE',
    'web.iml',
    '.hg',
    '.hgignore',
    '.hgcheck',
  ];
  return fs.readdirSync(root).every(file => validFiles.indexOf(file) >= 0);
}
