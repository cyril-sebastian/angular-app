# base image
FROM node:14-alpine


# install chrome for protractor tests
RUN apk add chromium && export CHROME_BIN='/usr/bin/chromium'

# set working directory
WORKDIR /app