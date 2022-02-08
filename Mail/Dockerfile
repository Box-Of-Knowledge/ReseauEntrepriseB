FROM ubuntu:latest

# Update tools
RUN apt update -y && apt upgrade -y

# Install tools
RUN apt-get install -y vim nano telnet mutt dnsutils net-tools iputils-ping mailutils
RUN apt-get install sudo -y

# Generate SSL Certificate [subject to change]
# RUN openssl req -new -x509 -days 3650 -nodes -newkey rsa:4096 -out /etc/ssl/certs/mailserver.pem -keyout /etc/ssl/private/mailserver.pem -subj


# Install DB? If MariaDB, 

# RUN apt update
# RUN apt-get install mariadb-server -y


# Install Dovecot
RUN DEBIAN_FRONTEND=noninteractive apt-get install dovecot-core dovecot-imapd dovecot-lmtpd [dovecot-mysql] dovecot-pop3d -y

# RUN mkdir -p /var/mail/vhosts/[mail nameserver]
# RUN groupadd -g 5000 vmail
# RUN useradd -g vmail -u 5000 vmail -d /var/mail
# RUN chown -R vmail:vmail /var/mail
# RUN chown -R vmail:dovecot /etc/dovecot
# RUN chmod -R o-rwx /etc/dovecot

