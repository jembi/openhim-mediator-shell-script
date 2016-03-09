[![OpenHIM Core](https://img.shields.io/badge/openhim--core-1.5%2B-brightgreen.svg)](http://openhim.readthedocs.org/en/latest/user-guide/versioning.html)

# openhim-mediator-shell-script
OpenHIM Mediator for executing shell scripts.

## Usage
Checkout from GitHub
```
git clone https://github.com/jembi/openhim-mediator-shell-script.git
npm install
```

Create an appropriate location for you scripts (only scripts in this location will be allowed to be executed)
```
mkdir /opt/openhim-shell-scripts
```
Next get a copy of the default config and place it in an appropriate location, e.g.
```
mkdir /etc/openhim
wget https://raw.githubusercontent.com/jembi/openhim-mediator-shell-script/master/config/default.json
mv default.json /etc/openhim/mediator-shell-script.json
```
Edit the values in this config according to your setup.

Execute the mediator with the argument `--conf /etc/openhim/mediator-shell-script.json`, e.g.
```
npm start -- --conf /etc/openhim/mediator-shell-script.json
```

Now you can setup your HIM channels and the mediator config via the console.

## Development
Checkout from GitHub
```
git clone https://github.com/jembi/openhim-mediator-shell-script.git
npm install
```
To run the mediator in development mode
```
grunt serve
```
or to run the tests
```
npm test
```
