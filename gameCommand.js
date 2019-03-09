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
        if (message.channel.id == 400983101507108876) return;
        const args = message.content.trim().split(/ +/g);
        /*
        if (args[0] == 'number1') {
            creditsModel.findOne({ userId: message.author.id }).then(user => {
                if (Date.now() - user.lastWarn < 86400000 * user.warn) {
                    return;
                }
                if (user) {
                    var date = new Date();
                    if (Date.now() - user.lastGameTime > 20000) {
                        if (user.credits > 0) {
                            var randomint = getRandomInt(1, 10000) % 10 + 1;
                            var playerror = 0;
                            if (args[1] > 10 || args[1] < 1 || isNaN(args[1])) {
                                message.channel.send("You need to say number between 1~10");
                                playerror = 1;
                            }
                            if (playerror == 0) {
                                var comment = 0;
                                user.credits -= 1;
                                if (randomint == args[1]) {
                                    user.credits += 9;
                                    comment = `Congratulation! You were right! :tada: You got 8 $RSD for free! total $RSD : ${user.credits}`;
                                }
                                if (comment == 0) {
                                    comment = `Sorry, The bot was thinking number ${randomint} :sob: You lost 1 $RSD. total $RSD : ${user.credits}`;
                                }
                                user.lastGameTime = date;
                                user.save(err => {
                                    if (err) return message.channel.send(err);
                                    message.channel.send(comment);
                                });
                            }
                        }
                        else {
                            message.channel.send(`You need at least 1 $RSD to play the game`);
                        }
                    }
                    else {
                        let remainingTime = getReadableTime(Date.now() - user.lastGameTime);
                        return message.channel.send(`You need to wait some more to play another game!!
**Remaining time**: ${remainingTime.s} seconds`);
                    }
                }
                else {
                    message.channel.send(`Please execute the ${config.prefix}register command!`);
                }
            });
        }
        */

        else if (args[0] == '$slots') {
            creditsModel.findOne({ userId: message.author.id }).then(user => {
                if (Date.now() - user.lastWarn < 86400000 * user.warn) {
                    return;
                }
                if (user) {
                    var date = new Date();
                    if (Date.now() - user.lastGameTime > 20000) {
                        if (user.credits > 0) {
                            var slots1 = Array();
                            var slots2 = Array();
                            var slots3 = Array();
                            var ans = new Array(0, 1, 2, 3);
                            var shuffle_ans = arrayShuffle(ans);
                            for (var i = 0; i < 3; i++) {
                                slots1[i] = getRandomInt(1, 10000) % 4;
                            }
                            for (var i = 0; i < 3; i++) {
                                slots2[i] = getRandomInt(1, 990000) % 100;
                            }
                            for (var i = 0; i < 3; i++) {
                                slots3[i] = getRandomInt(1, 10000) % 4;
                            }
                            var comment = Array(`| `, `| `, `| `, ``);
                            user.credits -= 1;
                            user.lastGameTime = date;
                            for (var i = 0; i < 3; i++) {
                                switch (slots1[i]) {
                                    case 0:
                                        comment[0] += `:apple: | `;
                                        break;
                                    case 1:
                                        comment[0] += `:banana: | `;
                                        break;
                                    case 2:
                                        comment[0] += `:tangerine: | `;
                                        break;
                                    case 3:
                                        comment[0] += `:grapes: | `;
                                        break;
                                }
                            }
                            comment[0] += `\n`;
                            for (var i = 0; i < 3; i++) {
                                var k = 0;
                                if (slots2[i] < 57) { k = shuffle_ans[0]; }
                                else if (slots2[i] < 80) { k = shuffle_ans[1]; }
                                else if (slots2[i] < 90) { k = shuffle_ans[2]; }
                                else if (slots2[i] < 100) { k = shuffle_ans[3]; }
                                switch (k) {
                                    case 0:
                                        comment[1] += `:apple: | `;
                                        break;
                                    case 1:
                                        comment[1] += `:banana: | `;
                                        break;
                                    case 2:
                                        comment[1] += `:tangerine: | `;
                                        break;
                                    case 3:
                                        comment[1] += `:grapes: | `;
                                        break;
                                }
                                slots2[i] = k;
                            }
                            comment[1] += `  <----\n`;
                            for (var i = 0; i < 3; i++) {
                                switch (slots3[i]) {
                                    case 0:
                                        comment[2] += `:apple: | `;
                                        break;
                                    case 1:
                                        comment[2] += `:banana: | `;
                                        break;
                                    case 2:
                                        comment[2] += `:tangerine: | `;
                                        break;
                                    case 3:
                                        comment[2] += `:grapes: | `;
                                        break;
                                }
                            }
                            comment[2] += `\n\n`;
                            if (slots2[0] == slots2[1] && slots2[1] == slots2[2]) {
                                user.credits += 6;
                                comment[3] = `You won the slots! :tada: You got 5 $RSD! total $RSD : ${user.credits}`;
                            }
                            else {
                                comment[3] = `You lose. You lost 1 $RSD :sob: total $RSD : ${user.credits}`;
                            }
                            user.save(err => {
                                if (err) return message.channel.send(err);
                                message.channel.send(comment[0] + comment[1] + comment[2] + comment[3]);
                            });
                        }
                        else {
                            message.channel.send(`You need at least 1 $RSD to play the game`);
                        }
                    }
                    else {
                        let remainingTime = getReadableTime(Date.now() - user.lastGameTime);
                        return message.channel.send(`You need to wait some more to play another game!!
**Remaining time**: ${remainingTime.s} seconds`);
                    }
                }
                else {
                    message.channel.send(`Please execute the ${config.prefix}register command!`);
                }
            });
        }
    });
}

function arrayShuffle(oldArray) {
    var newArray = oldArray.slice();
    var len = newArray.length;
    var i = len;
    while (i--) {
        var p = parseInt(Math.random() * len);
        var t = newArray[i];
        newArray[i] = newArray[p];
        newArray[p] = t;
    }
    return newArray;
};

function getReadableTime(date) {
    let d = new Date(20000 - date);
    return {
        s: getSeconds(d.getTime())
    };
}

function getSeconds(ms) {
    return Math.floor((ms / 1000) % 60);
}
