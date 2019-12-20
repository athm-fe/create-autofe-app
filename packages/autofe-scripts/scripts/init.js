'use strict';

const fs = require('fs-extra');
const path = require('path');
// const spawn = require('cross-spawn');
const chalk = require('chalk');

module.exports = (appPath, appName, verbose, originalDirectory) => {
  const ownPackageName = require(path.join(__dirname, '..', 'package.json')).name;
  const ownPath = path.join(appPath, 'node_modules', ownPackageName);
  const appPackage = require(path.join(appPath, 'package.json'));

  const pkg = {
    devDependencies: {
      'eslint': '^5.2.0',
      'eslint-config-autofe-app': '^1.0.0',
      "eslint-plugin-import": "^2.13.0",
      // 'babel-eslint': '^10.0.3',
    },
  };

  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};
  appPackage.devDependencies = Object.assign(pkg.devDependencies, appPackage.devDependencies);

  // Setup the script rules
  appPackage.scripts = {
    start: 'autofe-scripts start',
    build: 'autofe-scripts build',
    // 'test': 'autofe-scripts test --env=jsdom',
    // 'eject': 'autofe-scripts eject'
  };

  fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2));

  const readmeExists = fs.pathExistsSync(path.join(appPath, 'README.md'));
  if (readmeExists) {
    fs.renameSync(path.join(appPath, 'README.md'), path.join(appPath, 'README.old.md'));
  }

  // Copy the files for the user
  fs.copySync(path.join(ownPath, 'template'), appPath);

  // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
  // See: https://github.com/npm/npm/issues/1862
  fs.move(path.join(appPath, 'gitignore'), path.join(appPath, '.gitignore'), [], (err) => {
    if (err) {
      // Append if there's already a `.gitignore` file there
      if (err.code === 'EEXIST') {
        const data = fs.readFileSync(path.join(appPath, 'gitignore'));
        fs.appendFileSync(path.join(appPath, '.gitignore'), data);
        fs.unlinkSync(path.join(appPath, 'gitignore'));
      } else {
        throw err;
      }
    }
  });

  usage();

  // // Run another npm install for react and react-dom
  // console.log('Installing react and react-dom from npm...');
  // console.log();
  // // TODO: having to do two npm installs is bad, can we avoid it?
  // var args = [
  //   'install',
  //   'react',
  //   'react-dom',
  //   '--save',
  //   verbose && '--verbose'
  // ].filter(function(e) { return e; });
  // var proc = spawn('npm', args, {stdio: 'inherit'});
  // proc.on('close', function (code) {
  //   if (code !== 0) {
  //     console.error('`npm ' + args.join(' ') + '` failed');
  //     return;
  //   }
  //
  //   usage();
  // });

  function usage() {
    // Display the most elegant way to cd.
    // This needs to handle an undefined originalDirectory for
    // backward compatibility with old global-cli's.
    let cdpath;
    if (originalDirectory &&
        path.join(originalDirectory, appName) === appPath) {
      cdpath = appName;
    } else {
      cdpath = appPath;
    }

    console.log();
    console.log(`Success! Created ${appName} at ${appPath}`);
    console.log('Inside that directory, you can run several commands:');
    console.log();
    console.log(chalk.cyan('  npm start'));
    console.log('    Starts the development server.');
    console.log();
    console.log(chalk.cyan('  npm run build'));
    console.log('    Bundles the app into static files for production.');
    console.log();
    // console.log(chalk.cyan('  npm test'));
    // console.log('    Starts the test runner.');
    // console.log();
    // console.log(chalk.cyan('  npm run eject'));
    // console.log('    Removes this tool and copies build dependencies, configuration files');
    // console.log('    and scripts into the app directory. If you do this, you can’t go back!');
    // console.log();
    console.log('We suggest that you begin by typing:');
    console.log();
    console.log(chalk.cyan('  cd'), cdpath);
    console.log(`  ${chalk.cyan('npm start')}`);
    if (readmeExists) {
      console.log();
      console.log(chalk.yellow('You had a `README.md` file, we renamed it to `README.old.md`'));
    }
    console.log();
    console.log('Happy hacking!');
  }
};
