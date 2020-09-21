[![OpenHIM Core](https://img.shields.io/badge/openhim--core-1.5%2B-brightgreen.svg)](http://openhim.readthedocs.org/en/latest/user-guide/versioning.html) [![Build Status](https://travis-ci.org/jembi/openhim-mediator-shell-script.svg?branch=master)](https://travis-ci.org/jembi/openhim-mediator-shell-script)

# openhim-mediator-shell-script
OpenHIM Mediator for executing shell scripts.

## Usage
Install via npm
```
npm install -g openhim-mediator-shell-script
```
(note this will need root/sudo permission)

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

Run the mediator:
```
openhim-mediator-shell-script --conf /etc/openhim/mediator-shell-script.json
```

Installation can also be done via docker. One simply has to pull the image

```bash
docker pull jembi/openhim-mediator-shell-script
```

The default configuration file `config/default.json` will have to be mounted to the container once updated with correct details. The target folder for the mount is `ect/openhim/`. The scripts to be executed will also be added via mounting or docker volumes to the folder `/opt/openhim-shell-scripts` and then the container can be run.

To run execute the command below

```bash
docker run -v <PATH_TO_CONFIG_FILES>:/etc/openhim  -v <PATH_TO_SCRIPTS>:/otp/openhim-shell-scripts -itp 5013:5013 jembi/openhim-mediator-shell-script
```

Now you can setup your HIM channels and the mediator config via the console.

## Polling Channel Example
Say we have a maintenance script `task.sh` that needs to execute on a daily basis. Copy the script into the mediator scripts directory and give it execute permission:
```
cp task.sh /opt/openhim-shell-scripts
chmod +x /opt/openhim-shell-scripts/task.sh
```
Note that the mediator *process* needs execute permission for the script.

With the script in place we can setup the channel and mediator in console. Go to *Mediators* and click on the *OpenHIM Shell Script Mediator* item. From there click on the blue *Configure Mediator* button.

Add a new script and give it an endpoint on which to trigger execution. Enter the name of the script `task.sh`. Any required arguments or environment variables can be added as well.
![screen shot 2016-03-10 at 09 12 34](https://cloud.githubusercontent.com/assets/1872071/13662056/4ab49908-e6a0-11e5-90d3-bb10298bf95b.png)

After you hit the *Save Changes* button, the mediator will automatically pick up on the new config.

Now we can setup a new channel that will call the script on a daily basis. Add a new polling channel:
![channel-basic-info](https://cloud.githubusercontent.com/assets/1872071/13661621/f0066d2c-e69c-11e5-9e8c-b7b7ad5c15b8.png)

Give it an access control permission such as `internal`.

Add the script route by picking the *OpenHIM Shell Script Mediator* option in *Add Mediator Route*. Edit the route and set *Route Path* to `/task`:
![channel-route](https://cloud.githubusercontent.com/assets/1872071/13661539/0907ab20-e69c-11e5-807a-d82ac6339dc1.png)

Click on *Save Changes* and then that's it. The polling channel will now execute the script daily. The script output (both `STDOUT` and `STDERR`) will be viewable in the response body for the transaction.

## Development
Checkout from GitHub
```
git clone https://github.com/jembi/openhim-mediator-shell-script.git
npm install
```
To run the mediator in development mode
```
npm start
```
or to run the tests
```
npm test
```

## License
This software is licensed under the Mozilla Public License Version 2.0.
