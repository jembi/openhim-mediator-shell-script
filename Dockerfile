FROM node:erbium-slim

WORKDIR /app

COPY . .

COPY package.json yarn.lock ./

RUN yarn

# Create folder for the shell scripts
RUN mkdir /app/openhim-shell-scripts

CMD ["yarn", "start"]
