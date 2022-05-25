const Discord = require('discord.js')
const config = require("../../config.json")

module.exports = {
    name: "suggestion",
    description: "Envoyer une suggestion",
    command: config.PREFIX + "suggestion",
    alias: "suggest",

    async execute(message, args, client) {

        if(args.length == 0){
            return message.reply(`Merci de préciser la suggestion après votre commande. ${command}`)
        }

        const chan = message.guild.channels.cache.get(config.ChanId.Suggestion);

        chan.send({embeds: [new Discord.MessageEmbed()
            .setTitle("Nouvelle suggestion de "+message.author.username)
            .setDescription(args.join(" "))
            .setColor(config.ColorEmbeds.Suggestion)
            .setFooter(config.FootersEmbed)
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))

        ]}).then(msg => {

            msg.react("<a:suggestyes:968240627278024844>")
            msg.react("<a:suggestidk:968240708840460298>")
            msg.react("<a:suggestno:968240660253667358>")

        })
        
        message.reply("Merci pour votre suggestion ! Elle a bien été prise en compte.")
    }
}