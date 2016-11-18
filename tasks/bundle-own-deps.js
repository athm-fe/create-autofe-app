#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Like bundle-deps, this script modifies packages/autofe-scripts/package.json,
// copying own dependencies (those in the `packages` dir) to bundledDependencies

var fs = require('fs');
var path = require('path');

var packagesDir = path.join(__dirname, '../packages');
var pkgFilename = path.join(packagesDir, 'autofe-scripts/package.json');
var data = require(pkgFilename);

data.bundledDependencies = fs.readdirSync(packagesDir)
  .filter(function (name) {
    return data.dependencies[name];
  });

fs.writeFile(pkgFilename, JSON.stringify(data, null, 2), 'utf8', function (err) {
  if (err) throw err;
  console.log('bundled ' + data.bundledDependencies.length + ' dependencies.');
});
