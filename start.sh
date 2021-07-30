#! /bin/sh
# shellcheck disable=SC2039
cd /tmp || exit
unzip /tmp/application.zip -d ~/chatRoom
cd ~/chatRoom || exit
chmod +x release.tgz
tar -xvf release.tgz
npm start &>> /root/start.log &

