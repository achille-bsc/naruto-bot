const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER"], fetchAllMembers: true, intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const ascii = require("ascii-table");
let table = new ascii("╭⊱ Commandes ⊱╮");
table.setHeading("Fichiers", "Catégorie", "Status");
let tableEvent = new ascii("╭⊱ Events ⊱╮")
tableEvent.setHeading("Fichiers", "Status");
const fs = require('fs')
const Runnable = require("./models/runnable.js")
client.db = require("quick.db");
client.request = new (require("rss-parser"))();
client.invites = new Discord.Collection();


client.on("ready", async bot => {


    console.log("----------------------------------------------------------------------------")
    console.log("          _   __                 __        ____        __ ")
    console.log("         / | / /___ ________  __/ /_____  / __ )____  / /_")
    console.log("        /  |/ / __ `/ ___/ / / / __/ __ \\/ __  / __ \\/ __/")
    console.log("       / /|  / /_/ / /  / /_/ / /_/ /_/ / /_/ / /_/ / /_  ")
    console.log("      /_/ |_/\\__,_/_/   \\__,_/`\\__/\\____/_____/\\____/\\__/  ")
    console.log("----------------------------------------------------------------------------")
    console.log("-                  Le bot vien de ce démarré                               -")
    console.log("-                  Développeur: Mathis_Bruel                               -")
    console.log("-                  Développer pour: NarutoIsland                           -")
    console.log("----------------------------------------------------------------------------")
    console.log("-                  Chargement des commandes en cours...                    -")
    console.log("----------------------------------------------------------------------------")
    console.log(table.toString());
    console.log("----------------------------------------------------------------------------")
    console.log("-                  Chargement des Events en cours...                       -")
    console.log("----------------------------------------------------------------------------")
    console.log(tableEvent.toString());
    console.log("----------------------------------------------------------------------------")


    setInterval(() => {

        const index = Math.floor(Math.random() * (config.ActivityMessages.length));
        client.user.setActivity(config.ActivityMessages[index]);

    }, 20000);

    handleUploads()

    //invites
    const guild = await client.guilds.cache.get(config.GuildId);
    const invites = await guild.invites.fetch();

    for (let invite of invites) {

        client.invites.set(invite[1].code, { uses: invite[1].uses, inviter: invite[1].inviterId });
        
    }

    Runnable.start(guild)


})


// Vidéaste

function handleUploads() {
    if (client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);
    setInterval(() => {
        config.videastList.forEach((videast) => {
            client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${videast}`)
                .then(data => {

                    if (data.items[0] == null) return;
                    if (client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;

                    client.db.set(`videoData`, data.items[0]);
                    client.db.push("postedVideos", data.items[0].link);
                    const parsed = client.db.fetch(`videoData`);
                    const channel = client.channels.cache.get(config.ChanId.Videast);

                    if (!channel) return;

                    const message = config.VideastMessage
                        .replace(/{author}/g, parsed.author)
                        .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                        .replace(/{url}/g, parsed.link)
                        .replace(/{mention}/g, "<@&" + config.autoRole.Vidéaste + ">")
                    ;
                    
                    channel.send(message);

                })
            ;
        })
    }, config.watchInterval);
}


// Command handler

client.commands = new Discord.Collection();
client.commandsUtils = new Discord.Collection();
client.commandsModo = new Discord.Collection();
client.commandsAdmin = new Discord.Collection();
const commandModoFiles = fs.readdirSync('./commands/modo').filter(file => file.endsWith('js'))
const commandUtilFiles = fs.readdirSync('./commands/utils').filter(file => file.endsWith('js'))
const commandAdminFiles = fs.readdirSync('./commands/admin').filter(file => file.endsWith('js'))

for (const file of commandUtilFiles) {

    const command = require(`./commands/utils/${file}`)
    client.commands.set(command.name, command);
    if (command.alias) client.commands.set(command.alias, command);
    client.commandsUtils.set(command.name, command);
    table.addRow(file, "Utile", "OK");
}

for (const file of commandModoFiles) {

    const command = require(`./commands/modo/${file}`)
    client.commands.set(command.name, command);
    if (command.alias) client.commands.set(command.alias, command);
    client.commandsModo.set(command.name, command);
    table.addRow(file, "Modération", "OK");
}

for (const file of commandAdminFiles) {

    const command = require(`./commands/admin/${file}`)
    client.commands.set(command.name, command);
    if (command.alias) client.commands.set(command.alias, command);
    client.commandsAdmin.set(command.name, command);
    table.addRow(file, "Admin", "OK");
}

// event handler
const events = fs.readdirSync("./events").filter(file => file.endsWith("js"))

for (const file of events) {

    const event = require(`./events/${file}`)
    event.execute(client);
    tableEvent.addRow(file, "OK")

}

client.login(config.TOKEN)