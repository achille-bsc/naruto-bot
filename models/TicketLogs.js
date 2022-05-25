const Discord = require('discord.js');
const config = require('../config.json')

module.exports = (ticket, Action, category, id, actionneur, color, client) => {

    client.channels.fetch(config.ChanId.LogsTicket).then((chan) => {

        chan.send(
            { embeds: 
                [
                    new Discord.MessageEmbed()
                        .setColor(color)
                        .setTitle(actionneur.username+"#"+actionneur.discriminator)
                        .addField("Ticket", ticket, true)
                        .addField("Log", Action, true)
                        .addField("Category", category, true)
                        .addField("ID", id+"", false)
                        .setThumbnail(actionneur.displayAvatarURL({ format : `png`, dynamic : `true`}))
                        .setTimestamp()
                    ,
                ]
            }
        );

    })
}