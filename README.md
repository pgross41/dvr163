# dvr163
Open-source web interface for Eseenet/dvr163 NVR 
http://help.dvr163.com/index.php

## Build and run
```
sudo docker build -t dvr163 .
sudo ./scripts/docker-run.sh
```

## Enable autostart on boot
```
sudo ./scripts/install-autostart.sh
```

## Logs
```
sudo docker logs -f dvr163
```
