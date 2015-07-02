#!/bin/bash
ABSOLUTE_PATH=$(cd `dirname "${BASH_SOURCE[0]}"` && pwd)/../

pushd $ABSOLUTE_PATH > /dev/null
sed -i -e "s/\$VERSIONCODE/$1/g" config.xml
sed -i -e "s/\$VERSIONCODE/$1/g" package.json
popd > /dev/null
