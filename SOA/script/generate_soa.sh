#!/bin/bash
cd ..

mkdir /etc/bind/zones
cp named.conf /etc/bind/named.conf
cp config/named.conf.log /etc/bind/named.conf.log
cp config/$1/named.conf.local /etc/bind/named.conf.local
cp config/named.conf.options /etc/bind/named.conf.options

cp zones/db.$1 /etc/bind/zones/
cp zones/db.$1 /etc/bind/zones/

chmod +x ./script/generate_dnssec.sh
./script/generate_dnssec.sh $1

exit 0
