FROM node:erbium-alpine

COPY . .

RUN yarn

# Create folder for the shell scripts
RUN mkdir /opt/openhim-shell-scripts

CMD ["yarn", "start"]
