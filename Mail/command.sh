sudo apt-get install postfix postfix-mysql dovecot-core dovecor-imapd dovecot-pop3d dovecot-lmtpd mysql-server

sudo mysql_secure_installation

sudo mysql -u root -p

CREATE DATABASE mailserver;

CREATE USER 'mailuser'@'127.0.0.1' IDENTIFIED BY 'Box2022!';
GRANT SELECT ON mailserver.* TO 'mailuser'@'127.0.0.1';

FLUSH PRIVILEGES;

USE mailserver;

CREATE TABLE `virtual_domains` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `virtual_users` (
  `id` int(11) NOT NULL auto_increment,
  `domain_id` int(11) NOT NULL,
  `password` varchar(106) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  FOREIGN KEY (domain_id) REFERENCES virtual_domains(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `virtual_aliases` (
  `id` int(11) NOT NULL auto_increment,
  `domain_id` int(11) NOT NULL,
  `source` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (domain_id) REFERENCES virtual_domains(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO mailserver.virtual_domains (name) VALUES ('france.boxofknow.xyz');

INSERT INTO mailserver.virtual_users (domain_id, password , email) VALUES ('1', TO_BASE64(UNHEX(SHA2('Box2022!', 512))) , 'user@france.boxofknow.xyz');
