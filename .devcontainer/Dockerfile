FROM golang:latest as bufbuild

RUN go install github.com/bufbuild/buf/cmd/buf@v1.32.2

FROM ubuntu:latest
ARG TARGETARCH
ARG TARGETOS

COPY --from=bufbuild /go/bin/buf /usr/local/bin/buf
#ENV XARCH=$TARGETARCH
#ENV XOS=$TARGETOS

RUN apt update -y && \
    apt install -y wget curl xz-utils \
    nodejs npm \
    unzip \
    && apt-get clean autoclean 

RUN case ${TARGETARCH} in \
    "arm64") \
        wget -O /tmp/protoc.zip https://github.com/protocolbuffers/protobuf/releases/download/v3.11.0/protoc-3.11.0-$TARGETOS-aarch_64.zip && \
        wget -O /usr/local/bin/protoc-gen-grpc-java https://repo1.maven.org/maven2/io/grpc/protoc-gen-grpc-java/1.26.0/protoc-gen-grpc-java-1.26.0-$TARGETOS-aarch_64.exe \
        ;; \
    "amd64") \
        wget -O /tmp/protoc.zip https://github.com/protocolbuffers/protobuf/releases/download/v3.11.0/protoc-3.11.0-$TARGETOS-x86_64.zip && \
        wget -O /usr/local/bin/protoc-gen-grpc-java https://repo1.maven.org/maven2/io/grpc/protoc-gen-grpc-java/1.26.0/protoc-gen-grpc-java-1.26.0-$TARGETOS-x86_64.exe  \
        ;; \
    *) \
        wget -O /tmp/protoc.zip https://github.com/protocolbuffers/protobuf/releases/download/v3.11.0/protoc-3.11.0-$TARGETOS-$TARGETARCH.zip && \
        wget -O /usr/local/bin/protoc-gen-grpc-java https://repo1.maven.org/maven2/io/grpc/protoc-gen-grpc-java/1.26.0/protoc-gen-grpc-java-1.26.0-$TARGETOS-$TARGETARCH.exe \
        ;; \
    esac && \
    chmod +x /usr/local/bin/protoc-gen-grpc-java && \
    cd /usr/local && \
    unzip /tmp/protoc.zip && \
    rm /tmp/protoc.zip && \
    npm install -g ts-protoc-gen

