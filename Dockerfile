FROM node:lts-alpine

RUN apt-get install git

ADD docker-entrypoint.sh /home/node/docker-entrypoint.sh

RUN chown node:node /home/node/docker-entrypoint.sh && \
    chmod ug+x /home/node/docker-entrypoint.sh

RUN cp -r ./openweather /home/node/app/ && \
    rm /home/node/app/Dockerfile /home/node/app/docker-entrypoint.sh /home/node/app/id.txt

RUN chown -R node:node /home/node/app/

WORKDIR /home/node/app

USER node

EXPOSE 3000

ENTRYPOINT /docker-entrypoint.sh