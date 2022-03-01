FROM node:lts

RUN mkdir /cli
WORKDIR /cli

COPY package.json .
COPY yarn.lock .

RUN yarn --no-cache install --silent

COPY . .

CMD ./bin/run
