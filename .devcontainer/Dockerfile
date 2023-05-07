FROM mcr.microsoft.com/devcontainers/base:ubuntu
# Install the xz-utils package
RUN apt update 
RUN apt install -y wget curl xz-utils build-essential \
    python3 python3-pip python3-venv git git-lfs fd-find \
    openjdk-8-jdk-headless

## install GOLANG
RUN case $(uname -s) in \
    "Linux") HOSTOS="linux" ;; \
    *) echo "Unknown OS $(uname -s)"; exit -1 ;; \
    esac && \
    case $(uname -m) in \
    "x86_64") HOSTARCH="amd64" ;; \
    "aarch64") HOSTARCH="arm64" ;; \
    *) echo "Unknown ARCH $(uname -m)"; exit -1 ;; esac && \
    curl -L -o - https://go.dev/dl/go1.20.3.${HOSTOS}-${HOSTARCH}.tar.gz | tar -C /usr/local -zxf - 
ENV PATH=$PATH:/usr/local/go/bin 
RUN GO111MODULE=on GOBIN=/usr/local/bin go install github.com/bufbuild/buf/cmd/buf@v1.17.0

## install nodejs 
RUN case $(uname -s) in \
    "Linux") HOSTOS="linux" ;; \
    *) echo "Unknown OS $(uname -s)"; exit -1 ;; \
    esac && \
    case $(uname -m) in \
    "x86_64") HOSTARCH="x64" ;; \
    "aarch64") HOSTARCH="arm64" ;; \
    *) echo "Unknown ARCH $(uname -m)"; exit -1 ;; esac && \
    curl -L -o - https://nodejs.org/download/release/v16.20.0/node-v16.20.0-${HOSTOS}-${HOSTARCH}.tar.xz | tar -C /usr/local  --strip-components=1 -Jxf -

USER vscode 

WORKDIR /home/vscode

ENV PATH=$PATH:/home/vscode/go/bin



# install go dependencies
# ADD go.mod mod 
# RUN cat mod | grep -v "tcncloud.net" > go.mod && \
#     go mod edit -module=git.tcncloud.net/m/protos && \
#     go mod download && rm -f go.mod mod go.sum
RUN go install github.com/bufbuild/buf/cmd/buf@v1.18.0


# install poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
# make sure that poetry is in the path
ENV PATH=$PATH:/home/vscode/.local/bin

# install python project dependencies
# ADD pytcnapi/pyproject.toml pyproject.toml
# RUN poetry update && rm pyproject.toml poetry.lock


# # install sdkman
# RUN curl -s "https://get.sdkman.io" | bash 
# RUN source "/home/vscode/.sdkman/bin/sdkman-init.sh" 
# RUN sdk install gradle 8.1.1
# install please 
# RUN curl https://get.please.build | bash
