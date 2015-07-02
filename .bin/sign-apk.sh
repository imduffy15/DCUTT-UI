#!/bin/bash
ABSOLUTE_PATH=$(cd `dirname "${BASH_SOURCE[0]}"` && pwd)/../

pushd $ABSOLUTE_PATH > /dev/null
APK="$(find "./platforms/android/" -name "*.apk" -type f | grep -i "release")"
KEYSTORE="$1"
ALIAS="$2"
PASSWORD="$3"
OUTPUT="$4"

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "$KEYSTORE" "$APK" "$ALIAS" -storepass "$PASSWORD"
zipalign -v 4 "$APK" "$4"
popd > /dev/null
