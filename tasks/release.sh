#!/bin/bash
# Copyright (c) 2015-present, Facebook, Inc.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# ******************************************************************************
# This releases an update to the `react-scripts` package.
# Don't use `npm publish` for it.
# Read the release instructions:
# https://github.com/facebook/create-react-app/blob/master/CONTRIBUTING.md#cutting-a-release
# ******************************************************************************

# Start in tasks/ even if run from root directory
cd "$(dirname "$0")"

# Exit the script on any command with non 0 return code
# We assume that all the commands in the pipeline set their return code
# properly and that we do not need to validate that the output is correct
set -e

# Echo every command being executed
set -x

# Go to root
cd ..
root_path=$PWD

# You can only release with npm >= 3
if [ $(npm -v | head -c 1) -lt 3 ]; then
  echo "Releasing requires npm >= 3. Aborting.";
  exit 1;
fi;

if [ -n "$(git status --porcelain)" ]; then
  echo "Your git status is not clean. Aborting.";
  exit 1;
fi

cd $root_path
# Go!
./node_modules/.bin/lerna publish --independent "$@"
