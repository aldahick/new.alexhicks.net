#!/bin/bash

THIS_DIR=$(dirname $(realpath $0));

root_url="http://localhost:3000";
if [ $# -gt 1 ]; then
    root_url=$1;
fi;

schema=$(curl "$root_url/schema/browser");
"$THIS_DIR/../node_modules/.bin/wait-port" "$root_url";
echo "$schema" > "$THIS_DIR/../src/models.ts";
echo "Wrote updated models to src/models.ts";
