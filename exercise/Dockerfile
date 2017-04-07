#
# Nightwatch.js Dockerfile
#

FROM node:6-alpine

LABEL maintainer "Lukas Horak <horaklukas@centrum.cz>"

RUN apk --no-cache add \
    # Install tini, a tiny but valid init for containers:
    git
    ## Install NodeJS:
    #nodejs-lts \
    ## Install ffmpeg for video recording:
    #ffmpeg \
  #&& npm install -g \
    ## Install Nightwatch.js:
    #nightwatch@'<1.0' \
  ## Clean up obsolete files:
  #&& rm -rf \
    #/tmp/* \
    #/root/.npm

# get resources and prepare them
RUN mkdir /home/git && cd /home/git \
  && git clone https://github.com/horaklukas/webapp-testing-workshop.git workshop \
  && mkdir ../app && cd ../app \
  && cp -r ../git/workshop/exercise/symbolizer . \
  && cp -r ../git/workshop/exercise/api-server . \
  && cd symbolizer && yarn install \
  && cd ../api-server && yarn install

WORKDIR /home/app/symbolizer
#
#COPY wait-for.sh /usr/local/bin/wait-for
#COPY entrypoint.sh /usr/local/bin/entrypoint
#

EXPOSE 8080