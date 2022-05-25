const Discord = require('discord.js')
const config = require('../../config.json')
const Invit = require('../../files/Invit.json')

module.exports = {
    name: "topinvites",
    description: "Classement en fonction du nombre d'invitation par membres",
    command: config.PREFIX + "topinvites",

    async execute(message, args, client) {

        let embed = new Discord.MessageEmbed()
            .setTitle("Classement des membre en fonction des invitations")
            .setFooter(config.FootersEmbed)
            .setTimestamp()
            .setColor(config.ColorEmbeds.InviteList)

        let max = {
            user: "",
            nb: 0
        }
        let last = {
            user: "",
            nb: 0
        }
        let place = 0

        for (let i = 0; i < 10; i++) {
            let bool = false
            Invit.invite.forEach(obj => {
                if (obj.number >= max.nb && obj.memberId != last.user) {
                    place ++
                    bool = true
                    max.user = obj.memberId
                    max.nb = obj.number
                }
            })
            if (bool == true) {
                embed.addField(((place == 1) ? "1er place avec à son compteur "+max.nb+" invitations" : place+"ème place avec à son compteur "+max.nb+" invitations"), `<@${max.user}>`)
                max.nb = 0
                last = max
            }
        }
        message.channel.send({embeds: [embed]})
    }

}