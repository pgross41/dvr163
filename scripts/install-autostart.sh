#!/bin/bash 

cat >/etc/systemd/system/dvr163.service <<EOF
[Unit]
Description=dvr163
Requires=docker.service
After=docker.service dbus.socket

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStartPre=-/usr/bin/docker stop dvr163
ExecStart=$(dirname "$(readlink -f "$0")")/docker-run.sh
ExecStop=-/usr/bin/docker stop dvr163

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable dvr163
