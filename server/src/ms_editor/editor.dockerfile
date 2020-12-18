FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY webpack.config.js ./
COPY custom.d.ts ./
COPY src/ms_editor/ ./src/main
COPY src/common ./src/common
RUN mkdir ./logs

ARG BUILD_ENV

RUN echo Current build environment ::: ${BUILD_ENV}

# Installing packages according to build environment
RUN if [ "${BUILD_ENV}" = "development" ]; \
  then echo installing development packages && npm install; \
  else echo installing production packages && npm install --only=production; \
  fi

RUN if [ "${BUILD_ENV}" = "production" ]; \
  then echo building production build && npm run; \
  fi

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

# CMD ["npm", "start"]