const Discord = require('discord.js')
ticketjson = require("../../files/ticket.json")
const fs = require("fs")
const Buffer = require("buffer")
const config = require("../../config.json")

module.exports = {
    name: "admin-ticket",
    description: "Pour envoyer le message de ticket.",
    command: config.PREFIX + "admin-ticket",

    execute(message, args, client) {

        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId("Administration")
                .setLabel("Administration")
                .setStyle("PRIMARY")
                .setEmoji("👑")
            ,
            new Discord.MessageButton()
                .setCustomId("Recrutement")
                .setLabel("Recrutement")
                .setStyle("PRIMARY")
                .setEmoji("📖")
            ,
            new Discord.MessageButton()
                .setCustomId("Support")
                .setLabel("Support")
                .setStyle("PRIMARY")
                .setEmoji("👮")
            ,
            new Discord.MessageButton()
                .setCustomId("Autre")
                .setLabel("Autre")
                .setStyle("PRIMARY")
                .setEmoji("📩")
            ,
        )
        message.channel.send(
            {
                embeds: [new Discord.MessageEmbed()
                    .setColor(config.ColorEmbeds.TicketMessage)
                    .setTitle("⚙️ Bienvenue dans le Support de Naruto Islands ! ⚙️")
                    .setDescription("Les tickets sont un moyen pour nous de pouvoir discuter entre le Staff et les joueurs sans devoir MP un des membres du staff, C'est un moyen aussi de pouvoir très rapidement contacter le staff en cas de problème.\n\n**⚠️ Tout abus/troll avec les tickets seront sévèrement sanctionner !**\n")
                    .addField("⮚ Administration 👑", `__Les tickets Administration sont la pour :__\n
                    - Un problème avec la boutique
                    - Un problème avec un des membres du Staff
                    - Un problème avec le forum
                    - Une Demande déban ( uniquement pour les Ban def )`)
                    .addField("⮚ Recrutement 📖", "Les tickets recrutements sont la pour avoir un dossier candidat, lorsque vous postulez au différente équipe du staff .")
                    .addField("⮚ Support 👮", `__Les tickets Support sont la pour :__\n
                    - Un problème discord
                    - Un problème Launcher
                    - Un problème IG
                    - Un problème Forum`)
                    .addField("⮚ Autre 📩 ", "Les tickets autre sont uniquement pour les autres problème qui n'ont aucun rapport avec les différent type de ticket ci dessus.")
                    .setTimestamp()
                    .setFooter(config.FootersEmbed)

                ], components: [row]
            }
        ).then(msg => {

            ticketjson.msgDefault = msg.id
            let data = JSON.stringify(ticketjson);
            fs.writeFileSync('files/ticket.json', data, (err) => {
                if (err) throw err;
            });

        })

        message.delete()
    }
}