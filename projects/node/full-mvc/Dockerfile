FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
RUN npm install -g nodemon
COPY . /usr/src/app
EXPOSE 3002
CMD [ "npm", "start" ]
