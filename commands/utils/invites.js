const Discord = require('discord.js')
const config = require('../../config.json')
const Invit = require('../../files/Invit.json')

module.exports = {
    name: "invites",
    description: "Retourne le nombre d'invitation d'un membre",
    command: config.PREFIX + "invitations [member]",

    async execute(message, args, client) {
        if (args.length == 0) {
            let bool = false
            let nb = 0
            let str = ""
            for (var i = 0; i < Invit.invite.length; i++) {
                if (Invit.invite[i].memberId == message.author.id) {
                    Invit.invite[i].user.forEach(user => {
                        nb++
                        if (str == "") {
                            str = "<@" + user + ">"
                        } else {
                            str = str + ", <@" + user + ">"
                        }
                    })
                    if (nb != 0) {
                        message.channel.send({
                            embeds: [new Discord.MessageEmbed()
                                .setTitle("Vos invitations")
                                .setDescription(`Vous avez **${nb}** invitation(s) à votre compteur !`)
                                .setTimestamp()
                                .setFooter(config.FootersEmbed)
                                .setColor(config.ColorEmbeds.InviteList)
                                .addField("Liste de(s) utilisateur(s) que vous avez invité(s)", str)
                            ]
                        })
                        return
                    }
                }
            }
            message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Vos invitations")
                    .setDescription(`Vous avez ${0} invitation(s) à votre compteur !`)
                    .setTimestamp()
                    .setFooter(config.FootersEmbed)
                    .setColor(config.ColorEmbeds.InviteList)
                ]
            })

            return
        } else {
            id = args[0].replace(/</g, '')
            id = id.replace(/>/g, '')
            id = id.replace(/!/g, '')
            id = id.replace(/@/g, '')
            if(!message.guild.members.cache.get(id)){
                return message.channel.send("Une erreur est survenue, ce membre est introuvable.")
            }
            const member = message.guild.members.cache.get(id)
            let nb = 0
            let str = ""
            for (var i = 0; i < Invit.invite.length; i++) {
                if (Invit.invite[i].memberId == id) {
                    Invit.invite[i].user.forEach(user => {
                        nb++
                        if (str == "") {
                            str = "<@" + user + ">"
                        } else {
                            str = str + ", <@" + user + ">"
                        }
                    })
                    if (nb != 0) {
                        message.channel.send({
                            embeds: [new Discord.MessageEmbed()
                                .setTitle(`Invitations de ${member.user.username}`)
                                .setDescription(`${member.user.username} **${nb}** invitation(s) à sont compteur !`)
                                .setTimestamp()
                                .setFooter(config.FootersEmbed)
                                .setColor(config.ColorEmbeds.InviteList)
                                .addField(`Liste de(s) utilisateur(s) que ${member.user.username} à invité(s)`, str)
                            ]
                        })
                        return
                    }
                }
            }
            message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle(`Invitations de ${member.user.username}`)
                    .setDescription(`${member.user.username} ${0} invitation(s) à sont compteur !`)
                    .setTimestamp()
                    .setFooter(config.FootersEmbed)
                    .setColor(config.ColorEmbeds.InviteList)
                ]
            })

            return
        }
    }
}