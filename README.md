# Discord bot and Ngrok auto tunnel restarter 

## New address is sent to specified channel every 2 hours

## Prerequisites :

### - Create Discord bot, get token, add to server
### - Setup apache to serve webpage/content, [How to setup Apache](https://github.com/winter-b/Setups/tree/master/apache)
### - Install nodejs 16.x 

## How to setup as systemd service
Run:
```
cd /var/www/
sudo -u www-data git clone https://github.com/winter-b/ngrok-bot 
sudo nano /etc/systemd/system/ngrok-bot.service
```
Add:
```
[Unit]
Description=Ngrok tunnel restarter
After=network.target

[Service]
Environment=NODE_PORT=80
User=www-data
Restart=on-failure
WorkingDirectory=/var/www/ngrok-bot/
ExecStart=/usr/bin/node index.js

[Install]
WantedBy=multi-user.target
```
Run:
```
sudo systemctl start ngrok-bot.service
sudo systemctl enable ngrok-bot.service
```
