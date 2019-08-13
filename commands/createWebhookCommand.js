const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');

module.exports.alias = "createwebhook";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    if (message.author.id == '540084012845367297' ) {
        serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
            if (server) {
                    message.channel.createWebhook("iantbot RS1 Format Webhook", "https://i.imgur.com/p2qNFag.png").
                    then(webhook => {
                        console.log(webhook.id);
                        console.log(webhook.token);
                    });
                        server.save(err => {
                            if (err) return message.channel.send(`unexpected error happened`);
                            return message.channel.send(`done`);
                            });
            }
            else {
                message.channel.send(`Please execute the ${config.prefix}register command!`)
            }
        });
    }
}
