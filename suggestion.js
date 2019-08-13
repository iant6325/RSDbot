const Discord = require('discord.js');
const config = require('./config');
const translate = require('@vitalets/google-translate-api');
const fs = require('fs')

const commands = [];

/**
 * 
 * @param {Discord.Client} Client 
 */
module.exports = function (Client) {
    Client.on('message', message => {
        let args = message.content.split(' ');
        let args2 = message.content.split(/\s+/);
        if (message.author.bot) return;
        if (message.content.indexOf(config.prefix) == 0) return;
        if (message.channel.type == 'dm') return;
        if (args[0] == 'suggestion' || args[0] == 'Suggestion' || args2[0] == 'suggestion' || args2[0] == 'Suggestion') {
            args2.shift();
            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                if (message.channel.id == '600969985350696961') {
                    const webhook = new Discord.WebhookClient(server.rs1webhookid, server.rs1webhooktoken);
                    if (message.attachments.size > 0) {
                            webhook.send('```Suggestion```\n' + args2.join(' '), {
                                files: [{
                                  attachment: message.attachments.array()[0].url
                                }],
                                username: message.member.displayName,
                                avatarURL: message.author.displayAvatarURL
                                });
                            return message.delete();
                    }
                    else {
                        webhook.send('```Suggestion```\n' + args2.join(' '), {
                            username: message.member.displayName,
                            avatarURL: message.author.displayAvatarURL
                            });
                        return message.delete();
                    }
                }
                if (message.channel.id == '606915004029206571') {
                    const webhook = new Discord.WebhookClient(server.rs2webhookid, server.rs2webhooktoken);
                    if (message.attachments.size > 0) {
                        webhook.send('```Suggestion```\n' + args2.join(' '), {
                            files: [{
                              attachment: message.attachments.array()[0].url
                            }],
                            username: message.member.displayName,
                            avatarURL: message.author.displayAvatarURL
                            });
                        return message.delete();
                    }
                    else {
                        webhook.send('```Suggestion```\n' + args2.join(' '), {
                            username: message.member.displayName,
                            avatarURL: message.author.displayAvatarURL
                            });
                        return message.delete();
                    }
                }
            });
        }

        else if (args[0] == 'glitch' || args[0] == 'Glitch' || args2[0] == 'glitch' || args2[0] == 'Glitch') {
            args2.shift();
            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                if (message.channel.id == '600969985350696961') {
                    const webhook = new Discord.WebhookClient(server.rs1webhookid, server.rs1webhooktoken);
                    if (message.attachments.size > 0) {
                            webhook.send('```Glitch```\n' + args2.join(' '), {
                                files: [{
                                  attachment: message.attachments.array()[0].url
                                }],
                                username: message.member.displayName,
                                avatarURL: message.author.displayAvatarURL
                                });
                            return message.delete();
                    }
                    else {
                        webhook.send('```Glitch```\n' + args2.join(' '), {
                            username: message.member.displayName,
                            avatarURL: message.author.displayAvatarURL
                            });
                        return message.delete();
                    }
                }
                if (message.channel.id == '606915004029206571') {
                    const webhook = new Discord.WebhookClient(server.rs2webhookid, server.rs2webhooktoken);
                    if (message.attachments.size > 0) {
                        webhook.send('```Glitch```\n' + args2.join(' '), {
                            files: [{
                              attachment: message.attachments.array()[0].url
                            }],
                            username: message.member.displayName,
                            avatarURL: message.author.displayAvatarURL
                            });
                        return message.delete();
                    }
                    else {
                        webhook.send('```Glitch```\n' + args2.join(' '), {
                            username: message.member.displayName,
                            avatarURL: message.author.displayAvatarURL
                            });
                        return message.delete();
                    }
                }
            });
        }

        else if (args[0] != '>' && args2[0] != '```Suggestion```' && args2[0] != '```suggestion```' && args2[0] != '```Glitch```' && args2[0] != '```glitch```' && args[0] != '') {
            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                if (message.channel.id == '600969985350696961') {
                    const webhook = new Discord.WebhookClient(server.rs1webhookid, server.rs1webhooktoken);
                    if (message.attachments.size > 0) {
                            webhook.send('> ' + args2.join(' '), {
                                files: [{
                                  attachment: message.attachments.array()[0].url
                                }],
                                username: message.member.displayName,
                                avatarURL: message.author.displayAvatarURL
                                });
                            return message.delete();
                        }
                    else {
                        const webhook = new Discord.WebhookClient(server.rs1webhookid, server.rs1webhooktoken);
                        webhook.send('> ' + args2.join(' '), {
                            username: message.member.displayName,
                            avatarURL: message.author.displayAvatarURL
                            });
                        return message.delete();
                    }
                }
                if (message.channel.id == '606915004029206571') {
                    const webhook = new Discord.WebhookClient(server.rs2webhookid, server.rs2webhooktoken);
                    if (message.attachments.size > 0) {
                        webhook.send('> ' + args2.join(' '), {
                            files: [{
                              attachment: message.attachments.array()[0].url
                            }],
                            username: message.member.displayName,
                            avatarURL: message.author.displayAvatarURL
                            });
                        return message.delete();
                    }
                    else {
                        const webhook = new Discord.WebhookClient(server.rs2webhookid, server.rs2webhooktoken);
                        webhook.send('> ' + args2.join(' '), {
                            username: message.member.displayName,
                            avatarURL: message.author.displayAvatarURL
                            });
                        return message.delete();
                    }
                }
            });
        }
    });
}
