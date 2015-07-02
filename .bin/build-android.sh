#!/bin/bash
ABSOLUTE_PATH=$(cd `dirname "${BASH_SOURCE[0]}"` && pwd)/../

pushd $ABSOLUTE_PATH > /dev/null
grunt build
ionic state restore
ionic build --release android
popd > /dev/null
