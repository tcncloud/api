#!/usr/bin/env bash

echo removing descriptor.proto from everywhere
find . -name "*.proto" -exec sed -i '/descriptor.proto/ d' {} \; 

echo adding descriptor.proto to everywhere
find . -name "*.proto" -exec sed -i '/^package/ import "google/protobuf/descriptor.proto";' {} \;
