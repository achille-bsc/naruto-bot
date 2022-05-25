const Discord = require('discord.js')
const autorole = require("../../files/autorole.json")
const fs = require('fs')
const config = require('../../config.json')

module.exports = {
    name: "admin-autorole",
    description: "Pour envoyer le message des autoroles.",
    command: config.PREFIX + "admin-autorole",

    execute(message, args, client) {

        const row = new Discord.MessageActionRow().addComponents(

            new Discord.MessageButton()
                .setCustomId("News")
                .setLabel("News")
                .setStyle("PRIMARY")
                .setEmoji("📣")
            , 

            new Discord.MessageButton()
                .setCustomId("MAJ")
                .setLabel("Mise A jours")
                .setStyle("PRIMARY")
                .setEmoji("💻")
            ,

            new Discord.MessageButton()
                .setCustomId("PatchNote")
                .setLabel("Patch Note")
                .setStyle("PRIMARY")
                .setEmoji("🗒️")
            ,

            new Discord.MessageButton()
                .setCustomId("Vidéaste")
                .setLabel("Vidéaste")
                .setStyle("PRIMARY")
                .setEmoji("📷")
            ,

            new Discord.MessageButton()
                .setCustomId("Règlement")
                .setLabel("Règlement")
                .setStyle("PRIMARY")
                .setEmoji("👮")
            ,
        )
        const row2 = new Discord.MessageActionRow().addComponents(
            
            new Discord.MessageButton()
                .setCustomId("Sondage")
                .setLabel("Sondage")
                .setStyle("PRIMARY")
                .setEmoji("📊")
            ,
        )

        message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setTitle("Auto Rôle de Naruto Island")
            .setDescription(`Les auto-rôles sont là pour vous notifier en fonction de vos choix.
        <@&`+config.autoRole.News+`>
        <@&`+config.autoRole.MAJ+`>
        <@&`+config.autoRole.PatchNote+`>
        <@&`+config.autoRole.Vidéaste+`>
        <@&`+config.autoRole.Règlement+`>
        <@&`+config.autoRole.Sondages+`>`)
            .setColor("DARK_BLUE")
            .setFooter(config.FootersEmbed)

        ], components: [row, row2] }).then(msg => {
            
            autorole.msg = msg.id
            let data = JSON.stringify(autorole);
            fs.writeFileSync('files/autorole.json', data, (err) => {
              if (err) throw err;
            });
        })
        message.delete();
    }
}