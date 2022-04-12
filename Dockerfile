FROM node:16

WORKDIR /app

COPY . .

COPY package.json yarn.lock ./

RUN yarn

# Create folder for the shell scripts
RUN mkdir /app/openhim-shell-scripts

CMD ["yarn", "start"]
