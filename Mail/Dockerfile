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


# INSTALL DOVECOT
RUN DEBIAN_FRONTEND=noninteractive apt-get install dovecot-core dovecot-imapd dovecot-lmtpd dovecot-mysql dovecot-pop3d -y

# DOVECOT CONFIGURATION
# RUN mkdir -p /var/mail/vhosts/[mail nameserver]
# RUN groupadd -g 5000 vmail
# RUN useradd -g vmail -u 5000 vmail -d /var/mail
# RUN chown -R vmail:vmail /var/mail
# RUN chown -R vmail:dovecot /etc/dovecot
# RUN chmod -R o-rwx /etc/dovecot

# COPY config-dovecot/10-auth.conf /etc/dovecot/conf.d/10-auth.conf
# COPY config-dovecot/10-mail.conf /etc/dovecot/conf.d/10-mail.conf
# COPY config-dovecot/10-master.conf /etc/dovecot/conf.d/10-master.conf
# COPY config-dovecot/10-ssl.conf /etc/dovecot/conf.d/10-ssl.conf
# COPY config-dovecot/20-lmtp.conf /etc/dovecot/conf.d/20-lmtp.conf

# INSTALL POSTFIX
RUN DEBIAN_FRONTEND=noninteractive apt install postfix postfix-mysql -y
RUN mv /etc/postfix/main.cf /etc/postfix/main.cf.bak

# do we need this?
# RUN DEBIAN_FRONTEND=noninteractive apt-get install wget

# POSTFIX CONFIGURATION
# COPY config-postfix/main.cf /etc/postfix/main.cf
# COPY config-postfix/master.cf /etc/postfix/master.cf
# COPY config-postfix/generic /etc/postfix/generic
# COPY config-postfix/mysql-virtual-mailbox-domains.cf /etc/postfix/virtual-mailbox-domains.cf
# COPY config-postfix/mysql-virtual-mailbox-maps.cf /etc/postfix/virtual-mailbox-maps.cf

# only when DNS is configured 
# RUN postmap /etc/postfix/generic

