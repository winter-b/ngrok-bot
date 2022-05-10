const {Client, Intents} = require('discord.js');
const intents = new Intents(32767);
const token = require('./settings.json').Discord_bot_token;
const discordClient = new Client({intents});
discordClient.login(token);
discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}!`);
    var exec = require('child_process').exec;
    exec('killall ngrok | ngrok http 80 > /dev/null &', function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
});
