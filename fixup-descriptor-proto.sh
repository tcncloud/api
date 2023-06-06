#!/usr/bin/env bash

find ${REPO_NAME} -name "*.proto" -exec sed -i '/descriptor.proto/ d' {} \; 
find ${REPO_NAME} -name "*.proto" -exec sed -i '/^package/ import "google/protobuf/descriptor.proto";' {} \;
