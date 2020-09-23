FROM node:erbium-alpine

WORKDIR /app

COPY . .

RUN yarn

# Create folder for the shell scripts
RUN mkdir /opt/openhim-shell-scripts

CMD ["yarn", "start"]
