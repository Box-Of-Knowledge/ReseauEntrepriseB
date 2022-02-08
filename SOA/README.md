# Generate SOA Server

In order to create an SOA server for a specific domain, follow the following steps. Note that these steps are to be executed on a linux Debian system and require root privileges.

## Install bind9

Install bind9 dns software with the following command.

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install bind9 bind9utils -y
sudo apt autoremove
```

## Clone this Repository

Clone this repository on your server with the following command.

```bash
git clone https://github.com/Box-Of-Knowledge/ReseauEntrepriseB.git
```

## Execute the generate_soa.sh script

Set the correct files and settings by executing the generate_soa.sh script with the following commands.

```bash
cd ReseauEntrepriseB/SOA/scripts
chmod +x ./generate_soa.sh
sudo ./generate_soa.sh <domain_name>
```
