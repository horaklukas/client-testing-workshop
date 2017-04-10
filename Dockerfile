FROM node:6-alpine

LABEL maintainer "Lukas Horak <horaklukas@centrum.cz>"

COPY src/symbolizer/package.json /home/app/symbolizer/
COPY src/api-server/package.json /home/app/api-server/

RUN cd /home/app \
  && cd symbolizer && yarn install \
  && cd ../api-server && yarn install

COPY start.sh /home/
CMD ["sh", "/home/start.sh"]

WORKDIR /home/app/symbolizer

EXPOSE 3006
EXPOSE 9090
