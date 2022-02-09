# Generate SOA Server

## Install without Docker

In order to create an SOA server for a specific domain, follow the following steps. Note that these steps are to be executed on a linux Debian system and require root privileges.

### Install bind9

Install bind9 dns software with the following command.

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install bind9 bind9utils -y
sudo apt autoremove
```

### Clone this Repository

Clone this repository on your server with the following command.

```bash
git clone https://github.com/Box-Of-Knowledge/ReseauEntrepriseB.git
```

### Install haveged

In ordre to avoid the server taking a lot of time to generate the dnssec keys, install haveged with the following commands.

```bash
sudo apt install haveged
```

After haveged is installed, make sure the following argument is set int the `/etc/default/haveged` file.

```haveged
DAEMON_ARGS="-w 1024"
```

### Execute the generate_soa.sh script

Set the correct files and settings by executing the generate_soa.sh script with the following commands.

```bash
cd ReseauEntrepriseB/SOA/scripts
chmod +x ./generate_soa.sh
sudo ./generate_soa.sh <domain_name>
```

## Install with Docker

In case you want to install a docker container with bind in it, enter the following commands.

```bash
sudo docker build . -t bind_dns --build-arg DOMAIN_NAME=<domain_name>
sudo docker run -d --publish 53:53/tcp --publish 53:53/udp --name ns_soa bind_dns
```
