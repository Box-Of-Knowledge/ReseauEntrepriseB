#!/bin/bash
cd ..

cp named.conf /etc/bind/
cp config/named.conf.log /etc/bind
cp config/named.conf.local /etc/bind
cp config/named.conf.options /etc/bind

cp zones/db.$1 /etc/bind/zones
cp zones/db.$1 /etc/bind/zones

chmod +x ./script/generate_dnssec.sh
./script/generate_dnssec.sh $1
