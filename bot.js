const {Client, Intents} = require('discord.js');
const intents = new Intents(32767);
const token = require('./settings.json').Discord_bot_token;
const channel_id = require('./settings.json').Discord_channel_id;
const suffix = require('./settings.json').Url_suffix;
const discordClient = new Client({intents});
const ngrok = require('ngrok');
ngrok.authtoken(require('./settings.json').Ngrok_token);

discordClient.on('messageCreate', async message => {
    console.log(message.user + ' ' + message.content);
    if (message.content.startsWith('/link')) {
        const port = message.content.split(' ')[1];
        //try to delete ngrok tunnel
        try {
            await ngrok.disconnect();
        } catch (e) {
            console.log(e);
        }
        
        const url = await ngrok.connect(port);
        message.channel.send(url + suffix);
    }
});

discordClient.login(token);
discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}!`);
});

