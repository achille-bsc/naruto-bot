const Discord = require('discord.js')
const config = require("../../config.json")

module.exports = {
    name: "ban",
    description: "Pour bannir quelqu'un indéfiniment",
    command: config.PREFIX+"ban <membre> [raison]",

    execute(message, args, client) {

        if (args.length == 0) {

            return message.channel.send("Merci de spécifier le membre que vous voulez bannir après la commande. `" + this.command + "`");
        
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
                        .setColor(config.ColorEmbeds.Ban)
                        .setTitle("Bannisement")
                        .setDescription("Vous avez été bannis par " + message.author.username + " du serveur " + message.guild.name)
                        .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))
                        .setTimestamp()
                        .setFooter(config.FootersEmbed)
                    ]

                })

            } catch (err) { console.error(err) }

            setTimeout(() => {

                message.guild.members.ban(id, {
                    reason: `Bannis par le modérateur ${message.author.username}`
                }).then((member) => {

                    message.channel.send({
                        embeds: [new Discord.MessageEmbed()
                            .setColor(config.ColorEmbeds.Ban)
                            .setTitle("Bannisement")
                            .setDescription(member.username + " à bien été bannis sans raison précise.")
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
                        .setColor(config.ColorEmbeds.Ban)
                        .setTitle("Bannisement")
                        .setDescription("Vous avez été bannis par " + message.author.username + " du serveur " + message.guild.name + " pour raison: \n```" + reason + '```')
                        .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))
                        .setTimestamp()
                        .setFooter(config.FootersEmbed)
                    ]

                })

            } catch (e) { console.error(err) }

            setTimeout(() => {

                message.guild.members.ban(id, {
                    reason: reason
                }).then((member) => {

                    message.channel.send({
                        embeds: [new Discord.MessageEmbed()
                            .setColor(config.ColorEmbeds.Ban)
                            .setTitle("Bannisement")
                            .setDescription(member.username + " à bien été bannis pour la raison: \n`" + reason+"`")
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