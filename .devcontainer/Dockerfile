FROM bufbuild/buf:latest
ARG TARGETARCH
ARG TARGETOS


#ENV XARCH=$TARGETARCH
#ENV XOS=$TARGETOS

RUN case ${TARGETARCH} in \
    "arm64") \
        wget -S -O /tmp/protoc.zip https://github.com/protocolbuffers/protobuf/releases/download/v3.20.3/protoc-3.20.3-$TARGETOS-aarch_64.zip \
        ;; \
    "amd64") \
        wget -S -O /tmp/protoc.zip https://github.com/protocolbuffers/protobuf/releases/download/v3.20.3/protoc-3.20.3-$TARGETOS-x86_64.zip \
        ;; \
    *) \
        # wget -S -O /tmp/protoc.zip https://github.com/protocolbuffers/protobuf/releases/download/v3.20.3/protoc-3.20.3-$TARGETOS-$TARGETARCH.zip \
        ;; \
    esac && \
    cd /usr/local && \
    unzip /tmp/protoc.zip && \
    rm /tmp/protoc.zip && \
    apk --no-cache add \
    python3 python3-dev py3-pip \
    xz curl bash \
    git git-lfs \
    go \
    nodejs npm \
    && \
    npm install -g ts-protoc-gen


ENTRYPOINT [ "/bin/bash", "-c" ]

# # Install the xz-utils package
# RUN apt update -y && apt install -y wget curl xz-utils build-essential \
#     python3 python3-pip python3-venv python3-poetry git-lfs fd-find \
#     openjdk-8-jdk-headless

# ## Install Git Manually. The default version is 2.45.1 which introduced some breaking changes. We are manually installing the patched version (2.45.2) and can remove this when the ubuntu team releases the patch.
# RUN apt update -y && apt install -y \
#     libz-dev libssl-dev libcurl4-gnutls-dev libexpat1-dev gettext cmake gcc make curl \
#     && apt-get clean autoclean \
#     && apt-get autoremove --yes \
#     && rm -rf /var/lib/{apt,dpkg,cache,log}/

# RUN curl -L https://github.com/git/git/archive/refs/tags/v2.45.2.tar.gz -o /tmp/git.tar.gz \
#     && tar -zxf /tmp/git.tar.gz -C /tmp 

# WORKDIR /tmp/git-2.45.2
# RUN make prefix=/usr/local all \
#     && make prefix=/usr/local install 

# WORKDIR /tmp/
# RUN rm -rf /tmp/git.tar.gz && sudo rm -rf /tmp/git-2.45.2
# ## End custom Git Install

# ## install GOLANG
# RUN case $(uname -s) in \
#     "Linux") HOSTOS="linux" ;; \
#     *) echo "Unknown OS $(uname -s)"; exit -1 ;; \
#     esac && \
#     case $(uname -m) in \
#     "x86_64") HOSTARCH="amd64" ;; \
#     "aarch64") HOSTARCH="arm64" ;; \
#     *) echo "Unknown ARCH $(uname -m)"; exit -1 ;; esac && \
#     curl -L -o - https://go.dev/dl/go1.20.3.${HOSTOS}-${HOSTARCH}.tar.gz | tar -C /usr/local -zxf -
# ENV PATH=$PATH:/usr/local/go/bin
# RUN GO111MODULE=on GOBIN=/usr/local/bin go install github.com/bufbuild/buf/cmd/buf@v1.17.0

# ## install nodejs
# RUN case $(uname -s) in \
#     "Linux") HOSTOS="linux" ;; \
#     *) echo "Unknown OS $(uname -s)"; exit -1 ;; \
#     esac && \
#     case $(uname -m) in \
#     "x86_64") HOSTARCH="x64" ;; \
#     "aarch64") HOSTARCH="arm64" ;; \
#     *) echo "Unknown ARCH $(uname -m)"; exit -1 ;; esac && \
#     curl -L -o - https://nodejs.org/download/release/v16.20.0/node-v16.20.0-${HOSTOS}-${HOSTARCH}.tar.xz | tar -C /usr/local  --strip-components=1 -Jxf -

# ## install protoc 3.5.1
# RUN case $(uname -s) in \
#     "Linux") HOSTOS="linux" ;; \
#     *) echo "Unknown OS $(uname -s)"; exit -1 ;; \
#     esac && \
#     case $(uname -m) in \
#     "x86_64") HOSTARCH="x64" \
#     curl -L -o /usr/local/bin/protoc https://repo1.maven.org/maven2/com/google/protobuf/protoc/3.20.3/protoc-3.20.3-linux-x86_64.exe && chmod +x /usr/local/bin/protoc ;; \
#     *) echo "Unknown ARCH $(uname -m)" ;; esac

# ## install protoc-gen-grpc-java
# RUN case $(uname -s) in \
#     "Linux") HOSTOS="linux" ;; \
#     *) echo "Unknown OS $(uname -s)"; exit -1 ;; \
#     esac && \
#     case $(uname -m) in \
#     "x86_64") HOSTARCH="x64" \
#     curl -L -o /usr/local/bin/protoc-gen-grpc-java https://repo1.maven.org/maven2/io/grpc/protoc-gen-grpc-java/1.14.0/protoc-gen-grpc-java-1.14.0-linux-x86_64.exe && chmod +x /usr/local/bin/protoc-gen-grpc-java ;; \
#     *) echo "Unknown ARCH $(uname -m)" ;; esac

# USER vscode

# WORKDIR /home/vscode

# ENV PATH=$PATH:/home/vscode/go/bin



# # install go dependencies
# # ADD go.mod mod
# # RUN cat mod | grep -v "tcncloud.net" > go.mod && \
# #     go mod edit -module=git.tcncloud.net/m/protos && \
# #     go mod download && rm -f go.mod mod go.sum
# RUN go install github.com/bufbuild/buf/cmd/buf@v1.32.2


# # install poetry
# RUN curl -sSL https://install.python-poetry.org | python3 -
# # make sure that poetry is in the path
# ENV PATH=$PATH:/home/vscode/.local/bin

# # install python project dependencies
# # ADD pytcnapi/pyproject.toml pyproject.toml
# # RUN poetry update && rm pyproject.toml poetry.lock


# # # install sdkman
# # RUN curl -s "https://get.sdkman.io" | bash
# # RUN source "/home/vscode/.sdkman/bin/sdkman-init.sh"
# # RUN sdk install gradle 8.1.1
# # install please
# # RUN curl https://get.please.build | bash
