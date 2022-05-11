const {Client, Intents} = require('discord.js');
const intents = new Intents(32767);
const token = require('./settings.json').Discord_bot_token;
const channel_id = require('./settings.json').Discord_channel_id;
const discordClient = new Client({intents});
var exec = require('child_process').exec;

function startExecution(){
    executeCommand('kill ngrok');
    executeCommand('ngrok http 80 > /dev/null &');
    setTimeout(() => {
        exec('curl localhost:4040/api/tunnels', function (error, stdout, stderr) {
            console.log(stdout);
            var url = JSON.parse(stdout).tunnels[0].public_url;
            console.log(url)
            discordClient.channels.cache.get(channel_id).send(url);
        });
    }, 1000);
    //repeat every two hours
    setTimeout(startExecution, 7200000);
}

function executeCommand(command) {
    exec(command, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}

discordClient.login(token);
discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}!`);
    startExecution();
});

