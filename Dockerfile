# base image
FROM node:14-alpine


# install chrome for protractor tests
RUN apk add chromium

ENV CHROME_BIN=/usr/bin/chromium-browser

# set working directory
WORKDIR /app