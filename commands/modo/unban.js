const Discord = require('discord.js')
const config = require('../../config.json')
const fs = require("fs")

module.exports = {
    name: "unban",
    description: "Pour de-ban un membre du serveur.",
    command: config.PREFIX+"unban <membre>",

    async execute(message, args, client) {
        if(args.length == 0){
            message.channel.send("Merci de spécifier l'id du membre qu'il faut de-ban après la commande. `" + this.command + "`")
            return;
        }
        id = args[0].replace(/</g, '')
        id = id.replace(/>/g, '')
        id = id.replace(/!/g, '')
        id = id.replace(/@/g, '')
        message.guild.members.unban(id).then(user => {
            message.channel.send({embeds: [new Discord.MessageEmbed()
                .setTitle("Unban")
                .setColor(config.ColorEmbeds.Ban)
                .setTimestamp()
                .setFooter(config.FootersEmbed)
                .setDescription("Le membre <@"+id+"> viens d'être de-bannis du serveur !")
            
            ]})
        }).catch(err => {
            message.channel.send({embeds: [new Discord.MessageEmbed()
                .setTitle("Unban ERROR")
                .setColor(config.ColorEmbeds.Ban)
                .setTimestamp()
                .setFooter(config.FootersEmbed)
                .setDescription("Une erreur est survenue, le membre est introuvable ou n'est pas bannis.")
            
            ]})
        })

        message.delete();
    }


}
