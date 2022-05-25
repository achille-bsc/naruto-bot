const Discord = require('discord.js')
const config = require("../../config.json")
const ms = require('ms')
const moment = require('moment')
const tempBanFile = require("../../files/tempBan.json")
const fs = require('fs')

module.exports = {
    name: "tempban",
    description: "Pour bannir quelqu'un pendent un certain temps",
    command: config.PREFIX + "tempban <membre> <time> [raison]",

    execute(message, args, client) {

        if (args.length == 0) {
            return message.channel.send("Merci de spécifier le membre que vous voulez bannir après la commande. `" + this.command + "`");
        }

        if (args.length == 1) {
            return message.channel.send("Merci de spécifier le temps que vous voulez bannir après la commande. `" + this.command + "`");
        }

        id = args[0].replace(/</g, '')
        id = id.replace(/>/g, '')
        id = id.replace(/!/g, '')
        id = id.replace(/@/g, '')

        user = message.guild.members.cache.get(id)
        const date = new Date()
        date.setMilliseconds(date.getMilliseconds() + ms(args[1]))

        if (args.length == 2) {

            try {

                user.send({
                    embeds: [new Discord.MessageEmbed()
                        .setColor(config.ColorEmbeds.Ban)
                        .setTitle("Bannisement")
                        .setDescription("Vous avez été bannis par " + message.author.username + " du serveur " + message.guild.name +`\n Juqu\'au ${moment.utc(date).format("DD/MM/YYYY à hh:mm a")} `)
                        .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))
                        .setTimestamp()
                        .setFooter(config.FootersEmbed)
                    ]
                })

            } catch (err) { return console.error(err) }

            setTimeout(() => {

                message.guild.members.ban(id, {
                    reason: `Vous avez été temp-ban par le modérateur ${message.author.username} jusqu'au ${moment.utc(date).format("DD/MM/YYYY à hh:mm a")}`
                }).then((member) => {

                    message.channel.send({
                        embeds: [new Discord.MessageEmbed()
                            .setColor(config.ColorEmbeds.Ban)
                            .setTitle("Bannisement")
                            .setDescription(user.user.username + " à bien été bannis sans raison précise jusqu'au " + moment.utc(date).format("DD/MM/YYYY à hh:mm a"))
                            .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))
                            .setTimestamp()
                            .setFooter(config.FootersEmbed)
                        ]
                    })
                    
                    let json = {
                        "id": member.id,
                        "timestamp": date.getTime()
                    }

                    tempBanFile.push(json)
                    let data = JSON.stringify(tempBanFile);

                    fs.writeFileSync('files/tempBan.json', data, (err) => {
                        if (err) throw err;
                    });

                })
            }, 1000);
        }

        if (args.length >= 3) {

            const reason = args.splice(2).join(" ");

            try {

                user.send({
                    embeds: [new Discord.MessageEmbed()
                        .setColor(config.ColorEmbeds.Ban)
                        .setTitle("Bannisement")
                        .setDescription("Vous avez été bannis par " + message.author.username + " du serveur " + message.guild.name + " pour raison: ```" + reason + '``` Juqu\'au '+ moment.utc(date).format("DD/MM/YYYY à hh:mm a"))
                        .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))
                        .setTimestamp()
                        .setFooter(config.FootersEmbed)
                    ]
                })
            } catch (e) { return console.error(err) }

            setTimeout(() => {

                message.guild.members.ban(id, {
                    reason: reason + " | tempBan -> " + moment.utc(date).format("DD/MM/YYYY à hh:mm a")
                }).then((member) => {

                    message.channel.send({
                        embeds: [new Discord.MessageEmbed()
                            .setColor(config.ColorEmbeds.Ban)
                            .setTitle("Bannisement")
                            .setDescription(member.username + " à bien été bannis pour la raison: \n```" + reason +"```Jusqu'au "+ moment.utc(date).format("DD/MM/YYYY à hh:mm a"))
                            .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` }))
                            .setTimestamp()
                            .setFooter(config.FootersEmbed)

                        ]
                    })

                    let json = {
                        "id": member.id,
                        "timestamp": date.getTime()
                    }

                    tempBanFile.push(json)
                    let data = JSON.stringify(tempBanFile);
                    
                    fs.writeFileSync('files/tempBan.json', data, (err) => {
                        if (err) throw err;
                    });

                })
            }, 1000);

        }
        message.delete()
    }
}