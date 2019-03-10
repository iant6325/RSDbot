const Discord = require('discord.js')
const config = require('./config')
const fs = require('fs')

const commands = [];

/**
 * 
 * @param {Discord.Client} Client 
 */
module.exports = function (Client) {
    fs.readdir('./commands', (err, files) => {
        files.forEach(file => {
            let command = require(`./commands/${file}`)
            commands.push(command);
        });
    });

    Client.on('message', message => {

        if (message.author.bot) return;

        if (message.content.indexOf(config.prefix) != 0) return;

        if (message.channel.id == 400983101507108876) return;

        creditsModel.findOne({ userId: message.author.id }).then(user => {
            if (Date.now() - user.lastWarn < 86400000 * user.warn) {
                return;
            }
            else {
                const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
                const givenCommand = args.shift().toLowerCase();
                for (const command of commands) {
                    if (command.alias == givenCommand) {
                        return command.process(message);
                    }
                }
            }
        });
    });
}
