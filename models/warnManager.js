const Discord = require('discord.js')
const fs = require("fs")
warns = require("../files/warns.json")
const config = require("../config.json")

/*----------------------------------------------------------------

{
    "id": [
        {
            "name": "",
            "reason": "",
            "date": "",
            "who": "",
        }
    ]
}

*----------------------------------------------------------------*/


module.exports = {
    async warn(message, member, reason, modo) {
        chan = message.channel
        try {
            member.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Warn")
                    .setDescription("Vous venez d'être avertie pour raison:\n`" + reason + "`\nPar: " + modo.username)
                    .setColor(config.ColorEmbeds.Warn)
                    .setTimestamp()
                    .setFooter(config.FootersEmbed)
                ]
            })
        } catch { return console.error(err) }

        chan.send({
            embeds: [new Discord.MessageEmbed()
                .setTitle("Warn")
                .setDescription(`${member.username} à bien été avertie pour la raison: \n` + "`" + reason + "`")
                .setColor(config.ColorEmbeds.Warn)
                .setTimestamp()
                .setFooter(config.FootersEmbed)
            ]
        })
        
        var now = new Date();
        var annee = now.getFullYear();
        var mois = now.getMonth() + 1;
        var jour = now.getDate();
        var heure = now.getHours();
        var minute = now.getMinutes();
        id = member.id

        idWarn = warns.lastId+1
        warns.lastId = warns.lastId + 1
        warn = {
            "iduser": id,
            "name": member.username,
            "reason": reason,
            "date": jour + "/" + mois + "/" + annee + " " + heure + ":" + minute,
            "who": modo.username,
            "id": idWarn
        }
        warns.warns.push(warn)
        let data = JSON.stringify(warns);
        fs.writeFileSync('files/warns.json', data, (err) => {
            if (err) throw err;
        });

    },

    async warnlist(id) {
        list = []
        for (let i = 0; i < warns.warns.length; i++) {
            if (warns.warns[i].iduser == id) {
                list.push(warns.warns[i])
            }
        }
        return list
    },
    async remove(id, idwarn) {
        for (let i = 0; i < warns.warns.length; i++) {
            if (warns.warns[i].iduser == id) {
                if (warns.warns[i].id == idwarn) {
                    warns.warns.splice(i, 1)
                    let data = JSON.stringify(warns);
                    fs.writeFileSync('files/warns.json', data, (err) => {
                        if (err) throw err;
                    });
                    return true
                }
            }
        }
        return false
    }
}