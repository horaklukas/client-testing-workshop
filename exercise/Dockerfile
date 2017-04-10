FROM node:6-alpine

LABEL maintainer "Lukas Horak <horaklukas@centrum.cz>"

RUN apk --no-cache add git \
  # get resources and prepare them
  && mkdir /home/git && cd /home/git \
  && git clone https://github.com/horaklukas/webapp-testing-workshop.git workshop \
  && mkdir ../app && cd ../app \
  # symbolizer & api server
  && cp -r ../git/workshop/exercise/symbolizer . \
  && cp -r ../git/workshop/exercise/api-server . \
  && cd symbolizer && yarn install \
  && cd ../api-server && yarn install

CMD ["sh", "../api-server/start-bg.sh"]

WORKDIR /home/app/symbolizer

EXPOSE 8080
EXPOSE 9090