package api

//go:generate go install github.com/bufbuild/buf/cmd/buf@latest
//go:generate go install git.tcncloud.net/tools/protoc-gen-sq@latest
//go:generate env PATH=$PATH:$GOPATH/bin $GOPATH/bin/buf mod update
//go:generate env PATH=$PATH:$GOPATH/bin $GOPATH/bin/buf generate