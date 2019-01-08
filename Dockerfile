FROM leochan007/nodejs_base

LABEL MAINTAINER leo chan <leochan007@163.com>

ENV DEBIAN_FRONTEND noninteractive

COPY tmp/aci-commons /root/aci-commons

COPY app /root/demux_backend/app

COPY bin /root/demux_backend/bin

COPY utils /root/demux_backend/utils

COPY app.js /root/demux_backend/

COPY package.json /root/demux_backend/

COPY yarn.lock /root/demux_backend/

WORKDIR /root/demux_backend/

RUN yarn

CMD yarn run prd; tail -f /dev/null
