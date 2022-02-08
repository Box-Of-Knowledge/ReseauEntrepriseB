#!/bin/bash
# génération des clés pour le dnssec
cd /etc/bind/zones/
dnssec-keygen -a NSEC3RSASHA1 -b 2048 -n ZONE $1
dnssec-keygen -f KSK -a NSEC3RSASHA1 -b 4096 -n ZONE $1

# inclure les clés dans le fichier de zone
for key in `ls K$1*.key`
do
echo "\$INCLUDE $key">> db.$1
done

# signer la zone l2-2.ephec-ti.be et les machines à l'intérieur
dnssec-signzone -A -3 $(head -c 1000 /dev/random | sha1sum | cut -b 1-16) -N INCREMENT -o $1 -t db.$1

# https://www.digitalocean.com/community/tutorials/how-to-setup-dnssec-on-an-authoritative-bind-dns-server-2