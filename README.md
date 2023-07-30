# My Web CV
As much as it pains me to make a web based "CV" thing, I figure I have to do it. So here it is, [bbenetti.ca](https://bbenetti.ca/), lets hope it turns out.

## Legacy Notice 
This site hasn't been updated in quite some time. It requires a legacy go install to work. 
Here are some tips and tricks to get things running that I learned while moving this site to my homelab for cheeper hosting. 

Disable Go modules with.
```bash
export GO111MODULE=off
```

Set GOPATH and deploy this project under it according to Go workspace convention
```bash
export GOPATH=$HOME/go
git clone https://github.com/CanadianCommander/bbenetti.git ~/go/src/github.com/CanadianCommander/bbenetti
```

## build
This project is designed to run on the [microweb](https://github.com/CanadianCommander/MicroWeb) web server. There are two ways to install. One is a full system install where by files are installed in /etc and microweb is integrated with systemd or just a local fun install.

#### Prerequisites
- [Golang version > 1.8](https://golang.org/dl/). Note, the golang package on many distros is out of date and does not meet this requirement.
- [sass](https://sass-lang.com/dart-sass)

#### Full Install:
This install will install the microweb server and this site on to your system. This includes,
configuration files under /etc/microweb, site content under /var/www/, and systemd files.
- `git clone https://github.com/CanadianCommander/bbenetti.git # download the repository`
- `make getdept`
- `make`
- `make install`

Done! now use `systemctl start microweb` to start your new site!

#### Local Install:
This install only produces files in the folder of this repository and on your GOPATH. aka,
It doesn't clutter up your system.
- `git clone https://github.com/CanadianCommander/bbenetti.git # download the repository`
- `sudo -E ./server/getDependencies.sh     # download and build microweb`
- `make`
- `./microweb.a -c ./server/server.cfg.json   # start the web server on localhost:8080`
