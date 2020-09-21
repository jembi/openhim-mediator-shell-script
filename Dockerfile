FROM node:erbium-alpine

RUN npm install -g openhim-mediator-shell-script

# Create folder for the shell scripts
RUN mkdir /opt/openhim-shell-scripts

# Create folder for the config files
RUN mkdir /etc/openhim

COPY config /etc/openhim/

CMD ["openhim-mediator-shell-script", "--conf", "./etc/openhim/default.json"]

EXPOSE 5013
