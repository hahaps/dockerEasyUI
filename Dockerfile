FROM google/nodejs:latest

COPY server.js /
COPY dist/ /app

EXPOSE 8088
CMD /nodejs/bin/node /server.js 127.0.0.1 6732
