FROM ubuntu:latest

# Update tools
RUN apt update -y && apt upgrade -y

# Install tools
RUN apt-get install -y vim nano telnet mutt dnsutils net-tools iputils-ping mailutils
RUN apt-get install sudo -y

# Generate SSL Certificate [subject to change]
# RUN openssl req -new -x509 -days 3650 -nodes -newkey rsa:4096 -out /etc/ssl/certs/mailserver.pem -keyout /etc/ssl/private/mailserver.pem -subj