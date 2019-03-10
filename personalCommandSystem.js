const Discord = require('discord.js')
const config = require('./config')
const fs = require('fs')

const commands = [];

/**
 * 
 * @param {Discord.Client} Client 
 */
module.exports = function (Client) {
    fs.readdir('./personal', (err, files) => {
        files.forEach(file => {
            let command = require(`./personal/${file}`)
            commands.push(command);
        });
    });

    Client.on('message', message => {

        if (message.author.bot) return;

        if (message.content.indexOf(config.prefix) != 0) return;

        creditsModel.findOne({ userId: message.author.id }).then(user => {
            if (Date.now() - user.lastWarn < 86400000 * user.warn) {
                let remainingTime = getReadableTime(Date.now() - user.lastWarn, user.warn);
                console.log('checked');
                Client.channels.get(message.channel.id).send(`${message.author.username} got warned in last ${user.warn} days You can't use anything using the bot!
**Remaining time**: ${remainingTime.d} days ${remainingTime.h} hours ${remainingTime.m} minutes ${remainingTime.s} seconds`)
                    .then(msg =>
                        msg.delete(2500)
                    );
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

function getReadableTime(date, num) {
    let d = new Date(86400000 * num - date);
    return {
        d: getDays(d.getTime()),
        h: getHours(d.getTime()),
        m: getMinutes(d.getTime()),
        s: getSeconds(d.getTime())
    };
}

function getDays(ms) {
    return Math.floor(ms / 1000 / 60 / 60 / 24)
}
function getHours(ms) {
    return Math.floor((ms / 1000 / 60 / 60) % 24);
}

function getMinutes(ms) {
    return Math.floor((ms / 1000 / 60) % 60);
}

function getSeconds(ms) {
    return Math.floor((ms / 1000) % 60);
}

