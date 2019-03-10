function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const Discord = require('discord.js')
const config = require('./config')
const fs = require('fs')

const commands = [];
/**
 * 
 * @param {Discord.Client} Client 
 */
module.exports = function (Client) {
    Client.on('message', message => {
        if (message.author.bot) return;
        var gotexp = getRandomInt(3, 7)
        creditsModel.findOne({ userId: message.author.id }).then(user => {
            if (user) {
                if (Date.now() - user.lastWarn > 86400000 * user.warn) {
                    if (message.channel.id == "539955624784691231") { return 0; }
                    if (message.channel.id == "539962529217118218") { return 0; }
                    user.talkcheck = checkReacttime(user);
                    if (user.talkcheck == 7) {
                        user.warn = 1;
                        user.lastWarn = Date.now();
                        Client.channels.get(message.channel.id).send(`${message.author.username} got warned because you chatted 7 times in 4 seconds! You can't use any commands in ${user.warn} days`)
                            .then(msg =>
                                msg.delete(5000)
                        );
                        user.save(err => {
                            if (err) return message.channel.send(err);
                            return 0;
                        });
                        return 0;
                    }
                    user.exp += gotexp;
                    user.explb += gotexp;
                    if (user.exp >= (user.level + 1) * 70 && user.level <= 10) {
                        user.level += 1;
                        user.credits += user.level;
                        user.exp = 0;
                        Client.channels.get(message.channel.id).send(`${message.author.toString()} level up to ${user.level}! You got ${user.level} $RSD! total ${user.credits}`)
                            .then(msg =>
                                msg.delete(5000)
                            );
                    }

                    if (user.exp >= (user.level + 1) * 150 && user.level >= 11 && user.level <= 20) {
                        user.level += 1;
                        user.credits += user.level;
                        user.exp = 0;
                        Client.channels.get(message.channel.id).send(`${message.author.toString()} level up to ${user.level}! You got ${user.level} $RSD! total ${user.credits}`)
                            .then(msg =>
                                msg.delete(5000)
                            );
                    }

                    if (user.exp >= (user.level + 1) * 220 && user.level >= 21) {
                        user.level += 1;
                        user.credits += user.level;
                        user.exp = 0;
                        Client.channels.get(message.channel.id).send(`${message.author.toString()} level up to ${user.level}! You got ${user.level} $RSD! total ${user.credits}`)
                            .then(msg =>
                                msg.delete(5000)
                            );
                    }
                    user.lasttalk = Date.now();
                    user.save(err => {
                        if (err) return message.channel.send(err);
                        return 0;
                    });
                }
            }
            else {
                let newUserCredits = {
                    userId: message.author.id,
                    lastDailyBonusCollectTime: 0,
                    lastGameTime: 0,
                    credits: 0,
                    streaks: 0,
                    event: 0,
                    event1: 0,
                    event2: 0,
                    color: 0,
                    level: 0,
                    exp: gotexp,
                    explb: gotexp,
                    warn: 0,
                    reactcheck: 0,
                    lastReactTime: 0,
                    lastWarn: 0,
                    talkcheck: 0,
                    lasttalk: 0,
                };
                new creditsModel(newUserCredits).save(err => {
                    if (err) throw err;
                    return 0;
                });
            }
        });
    });
}

function checkReacttime(user) {
    if (Date.now() - user.lastWarn < 86400000 * user.warn) {
        return 1;
    }
    if (Date.now() - user.lasttalk < 4000) {
        return user.talkcheck + 1;
    }
    else {
        return 1;
    }
}