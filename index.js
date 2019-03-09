const discord = require('discord.js');
const mongoose = require('mongoose');
var gplay = require('google-play-scraper');
var astore = require('app-store-scraper');

config = require('./config');  //config file is not included in GIthub
const CommandSystem = require('./commandSystem')
const PersonalCommand = require('./personalCommandSystem')
const gameSystem = require('./gameCommand.js')
const numberSystem = require('./numberSystem.js')
const colorSystem = require('./colorSystem.js')
const levelSystem = require('./levelSystem.js')
const leaderboard = require('./leaderboard.js')
const roleSystem = require('./roleSystem.js')
const connection = mongoose.createConnection('mongodb://localhost/rsdbot')

const creditsSchema = new mongoose.Schema({
    userId: String,
    lastDailyBonusCollectTime: Date,
    lastGameTime: Date,
    credits: Number,
    streaks: Number,
    event: Number,
    event1: Number,
    event2: Number,
    customrole: String,
    customroleid: Number,
    color: Date,
    exp: Number,
    level: Number,
    explb: Number,
    warn: Number,
    reactcheck: Number,
    lastReactTime: Date,
    lastWarn: Date,
    lasttalk: Date,
    talkcheck: Number,

    // For game-news

    lastRSPS: Number,
    lastDLPS: Number,
    lastRSAS: String,
    lastDLAS: String,
    lastRS2AS: String,

    // For $number

    numbergame: Number,
    guessnum: Number,
    numbercount: Number,
    numberid: Number,
});
creditsModel = connection.model('credits', creditsSchema);

const Client = new discord.Client();

Client.on('ready', () => {
    console.log(`Bot is ready, logged in as '${Client.user.username}#${Client.user.discriminator}'`);
    CommandSystem(Client);
    gameSystem(Client);
    numberSystem(Client);
    PersonalCommand(Client);
    colorSystem(Client);
    levelSystem(Client);
    leaderboard(Client);
    roleSystem(Client);
    // Thunderfrostiesss codeS FOR StReAmInG sTaTuS
    Client.user.setGame('Playing Rolling Sky | $RSD Bot', 'https://www.twitch.tv/thunderfrost0001');
    Client.user.setStatus('idle')
        .catch(console.error);

    /*
    Client.channels.get("546312911476228109").send("Please choose how much $RSD do you want to get.").then(function (message) {
        message.react("1⃣");
        message.react("2⃣");
        message.react("3⃣");
    }); */
    

    Client.channels.get(config.getroles).send(`React to this message to obtain specific Roles. React a second time to remove a Role.
✅ - Verified (Get Access to more Channels & Events in this server)
🤖 - Android (Get notified when there's a new Android Update for Games)
🍎 - iOS (Get notified when there's a new iOS Update for Games)
🏦 - Bank (Get notified when there's updates about the Bank)
🗳 - Polls (Make Polls in #polls for the cost of 25 $RSD)`).then(function (message) {
        message.react("✅");
        message.react("🤖");
        message.react("🍎");
        message.react("🏦");
        message.react("🗳");

    });

    let guild = Client.guilds.get(config.emojiserver);

    /*
     
     color role need to be fixed.

    let redemoji = guild.emojis.find(emoji => emoji.name === "red");
    let blue2emoji = guild.emojis.find(emoji => emoji.name === "blue2");
    let adminemoji = guild.emojis.find(emoji => emoji.name === "admin");
    let blackemoji = guild.emojis.find(emoji => emoji.name === "black");
    let whiteemoji = guild.emojis.find(emoji => emoji.name === "white");
    let greenemoji = guild.emojis.find(emoji => emoji.name === "green");
    let yellowemoji = guild.emojis.find(emoji => emoji.name === "yellow");
    let yellow2emoji = guild.emojis.find(emoji => emoji.name === "yellow2");
    let cyanemoji = guild.emojis.find(emoji => emoji.name === "cyan");
    let pink2emoji = guild.emojis.find(emoji => emoji.name === "pink2");
    let purpleemoji = guild.emojis.find(emoji => emoji.name === "purple");
    let purple4emoji = guild.emojis.find(emoji => emoji.name === "purple4");
    let orangeemoji = guild.emojis.find(emoji => emoji.name === "orange");
    let lightblue2emoji = guild.emojis.find(emoji => emoji.name === "lightblue2");
    let lightorangeemoji = guild.emojis.find(emoji => emoji.name === "lightorange");
    let lightpurpleemoji = guild.emojis.find(emoji => emoji.name === "lightpurple");
    let darkblueemoji = guild.emojis.find(emoji => emoji.name === "darkblue");
    let proemoji = guild.emojis.find(emoji => emoji.name === "pro");
    let goldemoji = guild.emojis.find(emoji => emoji.name === "gold");
    let silveremoji = guild.emojis.find(emoji => emoji.name === "silver");
    let blueemoji = guild.emojis.find(emoji => emoji.name === "blue");
    let creamyemoji = guild.emojis.find(emoji => emoji.name === "creamy");

    Client.channels.get(config.assigncolors).send("React to get color role.").then(function (message) {
        message.react(redemoji.id);
        message.react(blue2emoji.id);
        message.react(adminemoji.id);
        message.react(blackemoji.id);
        message.react(whiteemoji.id);
        message.react(greenemoji.id);
        message.react(yellowemoji.id);
        message.react(yellow2emoji.id);
        message.react(cyanemoji.id);
        message.react(pink2emoji.id);
        message.react(purpleemoji.id);
        message.react(purple4emoji.id);
        message.react(orangeemoji.id);
        message.react(lightblue2emoji.id);
        message.react(lightorangeemoji.id);
        message.react(lightpurpleemoji.id);
        message.react(darkblueemoji.id);
        message.react(proemoji.id);
        message.react(goldemoji.id);
        message.react(silveremoji.id);
    });

    Client.channels.get(config.assigncolors).send("React to get color role.").then(function (message) {
        message.react(blueemoji.id);
        message.react(creamyemoji.id);
    });
    */

    Client.channels.get(config.assigncolors).send("React to check your cooldown.").then(function (message) {
        message.react("📆");
    });

    setInterval(function () {

        let guild = Client.guilds.get(config.rsdserver);

        gplay.app({ appId: 'com.turbochilli.rollingsky', country: 'vn' })
            .then(function (rs) {
                var updated = rs.updated;
                var version = rs.version;
                var note = rs.recentChanges;
                var changednote = note.replace(/<br>/gi, '\n');
                creditsModel.findOne({ userId: "540084012845367297" }).then((user, err) => {
                    if (user.lastRSPS < updated) {
                        user.lastRSPS = updated;
                        Client.channels.get(config.gamenews).send(`**Rolling Sky** is updated in Google Play Store
version : **${version}**
build version : ${updated}

${changednote}`);
                        user.save(err => {
                            if (err) return message.channel.send(err);
                            return 0;
                        });
                    }

                });
            });

        gplay.app({ appId: 'com.cmplay.dancingline', country: 'vn' })
            .then(function (rs) {
                var updated = rs.updated;
                var version = rs.version;
                var note = rs.recentChanges;
                var changednote = note.replace(/<br>/gi, '\n');
                creditsModel.findOne({ userId: "540084012845367297" }).then((user, err) => {
                    if (user.lastDLPS < updated) {
                        user.lastDLPS = updated;
                        Client.channels.get(config.gamenews).send(`**Dancing Line** is updated in Google Play Store
version : **${version}**
build version : ${updated}

${changednote}`);
                        user.save(err => {
                            if (err) return message.channel.send(err);
                            return 0;
                        });
                    }

                });
            });

        astore.app({ id: '1036661603', country: 'vn' })
            .then(function (rs) {
                var updated = rs.updated;
                var version = rs.version;
                var note = rs.releaseNotes;
                creditsModel.findOne({ userId: "540084012845367297" }).then((user, err) => {
                    if (user.lastRSAS != updated) {
                        user.lastRSAS = updated;
                        Client.channels.get(config.gamenews).send(`**Rolling Sky** is updated in Apple App Store
version : **${version}**
update date : ${updated}

${note}`);
                        user.save(err => {
                            if (err) return message.channel.send(err);
                            return 0;
                        });
                    }

                });
            });

        astore.app({ id: '1177953618', country: 'vn' })
            .then(function (rs) {
                var updated = rs.updated;
                var version = rs.version;
                var note = rs.releaseNotes;
                creditsModel.findOne({ userId: "540084012845367297" }).then((user, err) => {
                    if (user.lastDLAS != updated) {
                        user.lastDLAS = updated;
                        Client.channels.get(config.gamenews).send(`**Dancing Line** is updated in Apple App Store
version : **${version}**
update date : ${updated}

${note}`);
                        user.save(err => {
                            if (err) return message.channel.send(err);
                            return 0;
                        });
                    }

                });
            });
        
        astore.app({ id: '1359580527', country: 'vn' })
            .then(function (rs) {
                var updated = rs.updated;
                var version = rs.version;
                var note = rs.releaseNotes;
                creditsModel.findOne({ userId: "540084012845367297" }).then((user, err) => {
                    if (user.lastRS2AS != updated) {
                        user.lastRS2AS = updated;
                        Client.channels.get(config.gamenews).send(`**Rolling Sky 2** is updated in Apple App Store
version : **${version}**
update date : ${updated}

${note}`);
                        user.save(err => {
                            if (err) return message.channel.send(err);
                            return 0;
                        });
                    }

                });
            });
    }, 30000);
    /*
    Client.channels.get("540938690168356884").send("React to get access to experimental channels.").then(function (message) {
        message.react("😄");
    });
    */

    // Oh no! It'S oVeR :(((
});

// Client.on('guildMemberAdd', member => {
//     let newUserCredits = {
//         userId: member.user.id,
//         lastDailyBonusCollectTime: 0,
//         credits: 0
//     };
//     console.log(newUserCredits);
//     creditsModel.insertMany([newUserCredits]);
//     const defaultChannel = member.guild.channels.find(c => c.name == "discussion");
//     console.log(defaultChannel);
//     console.log(defaultChannel.send);
//     defaultChannel.send(`${member.user.username}#${member.user.discriminator} has joined, given 0 credits to him.`);
// });


Client.login(config.token);
