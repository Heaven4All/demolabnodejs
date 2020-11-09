FROM node:lts-alpine

RUN apt-get install git

ADD docker-entrypoint.sh /home/node/docker-entrypoint.sh

RUN chown node:node /home/node/docker-entrypoint.sh && \
    chmod ug+x /home/node/docker-entrypoint.sh

RUN git clone http://git.agile4security.io/blux/openweather.git 

WORKDIR /home/node/app

USER node

EXPOSE 3000

ENTRYPOINT /docker-entrypoint.sh