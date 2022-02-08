# CONFIG

## global variable
NEW_USER=xxxxx
TZ=Europe/Brussels

## Update
sudo apt-get update -y && sudo apt-get upgrade -y

##Time zone:
sudo timedatectl set-timezone $TZ

## New user:
sudo useradd -m $NEW_USER
sudo passwd $NEW_USER
sudo usermod --shell /bin/bash $NEW_USER
sudo usermod -a -G sudo $NEW_USER

sudo su $NEW_USER

## Changing default ssh port and removing root access:
echo "Port xxxxx" | sudo tee -a /etc/ssh/sshd_config
echo "PermitRootLogin no" | sudo tee -a /etc/ssh/sshd_config
echo "StrictModes yes" | sudo tee -a /etc/ssh/sshd_config
sudo systemctl restart sshd

## Adding fail2ban
sudo apt-get install fail2ban -y
sudo cp jail.conf /etc/fail2ban/jail.local
sudo /etc/init.d/fail2ban restart



echo -e "\033[42mDone!\033[0m"

exit 0
