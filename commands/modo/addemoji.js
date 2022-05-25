const Discord = require('discord.js')
const config = require("../../config.json")

module.exports = {
    name: "addemoji",
    description: "Ajouter un emoji",
    command: config.PREFIX + "addemoji <name> <emoji/link>",

    async execute(message, args, client) {

        if(args.length < 2) return message.channel.send("Merci de spécifier le nom de l'emoji. `" + this.command + "`")
        
        if(args[1].includes("http")){

            message.guild.emojis.create(args[1], args[0])

        }else{

            const parseEmoji = Discord.Util.parseEmoji(args[1])
            const extension = parseEmoji.animated ? ".gif" : ".png"
            const url = "https://cdn.discordapp.com/emojis/"+parseEmoji.id+extension
            message.guild.emojis.create(url, parseEmoji.name)
        
        }
        
        message.channel.send({embeds: [new Discord.MessageEmbed()
        
            .setTitle("Emoji Ajouter")
            .setColor("#5aad1d")
            .setTimestamp()
            .setFooter(config.FootersEmbed)
            .setDescription("L'emoji `"+args[0]+"` à bien été rajouter au serveur")
        
        ]})
    }
}