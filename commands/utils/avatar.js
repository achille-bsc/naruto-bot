const Discord = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: "avatar",
    description: "Récuperer l'avatar d'un membre",
    command: config.PREFIX+"avatar [member]",

    async execute (message, args, client){

        if(args.length == 0){

            message.channel.send({embeds: [new Discord.MessageEmbed()
                .setTitle(`Votre avatar`)
                .setTimestamp()
                .setImage(message.guild.members.cache.get(message.author.id).displayAvatarURL({ size: 1024, dynamic: true }))
                .setFooter(config.FootersEmbed)
                .setColor(config.ColorEmbeds.Avatar)
            ]})

        } else {

            if(args[0] == "serv"){
                message.channel.send({embeds: [new Discord.MessageEmbed()
                    .setTitle(`Avatar du serveur`)
                    .setTimestamp()
                    .setImage(message.guild.iconURL())
                ]})

                return;
            }

            id = args[0].replace(/</g, '')
            id = id.replace(/>/g, '')
            id = id.replace(/!/g, '')
            id = id.replace(/@/g, '')
            user = message.guild.members.cache.get(id)

            if(!user) return message.channel.send("Une erreur est survenue ! Ce membre n'est pas valide.");
            
            message.channel.send({embeds: [new Discord.MessageEmbed()
                .setTitle(`Avatar de ${user.user.username}`)
                .setTimestamp()
                .setFooter(config.FootersEmbed)
                .setColor(config.ColorEmbeds.Avatar)
                .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
            ]})

        }
    }

}