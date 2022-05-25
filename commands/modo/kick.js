const Discord = require('discord.js')
const config = require("../../config.json")

module.exports = {
    name: "kick",
    description: "Pour kick un membre du serveur",
    command: config.PREFIX+"kick <membre> [raison]",

    execute(message, args, client) {

        if(args.length == 0){
            message.channel.send("Merci de spécifier le membre que vous voulez kick après la commande. `"+this.command+"`")
        }
        
        id = args[0].replace(/</g, '')
        id = id.replace(/>/g, '')
        id = id.replace(/!/g, '')
        id = id.replace(/@/g, '')
        
        user = message.guild.members.cache.get(id)

        if (args.length == 1) {

            try {

                user.send({

                    embeds: [new Discord.MessageEmbed()
                        .setColor(config.ColorEmbeds.Kick)
                        .setTitle("Kick")
                        .setDescription("Vous avez été kick par " + message.author.username + " du serveur " + message.guild.name)
                        .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))
                        .setTimestamp()
                        .setFooter(config.FootersEmbed)
                    ]

                })

            } catch (err) { console.error(err) }

            setTimeout(() => {

                message.guild.members.kick(id, {
                    reason: "Vous avez été bannis par un modérateur."
                }).then((member) => {

                    message.channel.send({
                        embeds: [new Discord.MessageEmbed()
                            .setColor(config.ColorEmbeds.Kick)
                            .setTitle("Kick")
                            .setDescription(member.username + " à bien été kick sans raison précis.")
                            .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))
                            .setTimestamp()
                            .setFooter(config.FootersEmbed)

                        ]
                    })

                })

            }, 1000);
        }

        if (args.length >= 2) {
            const reason = args.splice(1).join(" ");

            try {

                user.send({
                    embeds: [new Discord.MessageEmbed()
                        .setColor(config.ColorEmbeds.Kick)
                        .setTitle("Kick")
                        .setDescription("Vous avez été kick par " + message.author.username + " du serveur " + message.guild.name + " pour raison: \n" + reason)
                        .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))
                        .setTimestamp()
                        .setFooter(config.FootersEmbed)
                    ]

                })
            } catch (e) { console.error(err) }

            setTimeout(() => {

                message.guild.members.kick(id, {
                    reason: reason
                }).then((member) => {

                    message.channel.send({

                        embeds: [new Discord.MessageEmbed()
                            .setColor(config.ColorEmbeds.Kick)
                            .setTitle("Kick")
                            .setDescription(member.username + " à bien été kick pour la raison: \n" + reason)
                            .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))
                            .setTimestamp()
                            .setFooter(config.FootersEmbed)

                        ]
                    })
                })
            }, 1000);
        }
        message.delete()
    }
}