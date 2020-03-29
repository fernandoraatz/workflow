FROM node:8.9.3-alpine
EXPOSE 4000
ADD . /leibniz
COPY package.json /leibniz
RUN cd /leibniz && \
    if [ -n "$HTTP_PROXY" ]; then echo "proxy=$HTTP_PROXY" >> ~/.npmrc; fi && \
    if [ -n "$HTTPS_PROXY" ]; then echo "https.proxy=$HTTPS_PROXY" >> ~/.npmrc; fi && \
    if [ -n "$HTTP_PROXY$HTTPS_PROXY" ]; then echo "strict-ssl=false" >> ~/.npmrc; fi && \
    npm install && \
    if [ -f ~/.npmrc ]; then rm ~/.npmrc; fi
VOLUME /leibniz/node_modules
WORKDIR /leibniz
CMD ["npm", "start"]