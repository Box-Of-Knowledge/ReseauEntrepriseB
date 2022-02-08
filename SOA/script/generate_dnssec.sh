#!/bin/bash
# génération des clés pour le dnssec
cd /etc/bind/zones/
dnssec-keygen -a RSASHA256 -b 2048 -f KSK $1
dnssec-keygen -a RSASHA256 -b 1280 -n ZONE $1

# inclure les clés dans le fichier de zone
for key in `ls K$1*.key`
do
echo "\$INCLUDE $key">> db.$1
done

# signer la zone l2-2.ephec-ti.be et les machines à l'intérieur
dnssec-signzone -o $1 -N INCREMENT -t -k $1.ksk.key db.$1 $1.zsk.key

exit 0

# https://www.digitalocean.com/community/tutorials/how-to-setup-dnssec-on-an-authoritative-bind-dns-server-2