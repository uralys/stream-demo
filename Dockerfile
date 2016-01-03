FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/maperial-stream
WORKDIR /usr/src/maperial-stream

# Install app dependencies
COPY package.json /usr/src/maperial-stream/
RUN npm install

# Bundle app source
COPY . /usr/src/maperial-stream

EXPOSE 3000
CMD [ "npm", "start" ]
