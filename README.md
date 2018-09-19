# My Web CV
As much as it pains me to make a web based "CV" thing, I figure I have to do it. So here it is (*domain name here*), lets hope it turns out.

## build
This project is designed to run on the [microweb](https://github.com/CanadianCommander/MicroWeb) web server. There are two ways to install. One is a full system install where by files are installed in /etc and microweb is integrated with systemd or just a local fun install.


#### Full System Install:
- `go get github.com/CanadianCommander/bbenetti    # download the repository`
- `cd <in to repository root>`
- `sudo -E ./server/get_microweb.sh install     # install micro web on to your system`
- `sudo ./server/install.sh     # configure the server and copy webroot to /etc/microweb/webroot`
- `sudo systemctl start microweb   # start the webserver`

the website should now be running under localhost:8080 on your computer.

#### Local fun Install:
- `go get github.com/CanadianCommander/bbenetti    # download the repository`
- `cd <in to repository root>`
- `sudo -E ./server/get_microweb.sh     # download and build microweb`
- there should now be a microweb.a executable in your current directory (I'll assume project root)
- `./microweb.a -c ./server/server.cfg.json   # start the web server`

the website should now be running under localhost:8080 on your computer.
