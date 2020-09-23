FROM node:erbium-alpine

WORKDIR /app

COPY . .

COPY package.json yarn.lock ./

RUN yarn

# Create folder for the shell scripts
RUN mkdir /opt/openhim-shell-scripts

CMD ["yarn", "start"]
