const Discord = require('discord.js')
const wait = require("timers/promises").setTimeout;
warnManager = require('../../models/warnManager.js')
const config = require("../../config.json")
module.exports = {
    name: "warnlist",
    description: "Voir les avertisement d'un membre",
    command: config.PREFIX + "warnlist <member>",

    async execute(message, args, client) {

        if (args.length < 1) return message.channel.send("Merci de spécifier le membre. `" + this.command + "`")
        id = args[0].replace(/</g, '')
        id = id.replace(/>/g, '')
        id = id.replace(/!/g, '')
        id = id.replace(/@/g, '')
        let list = warnManager.warnlist(id)
        await Promise.resolve(list).then(value => {
            list = value;
        })
        user = message.guild.members.cache.get(id).user
        embed = new Discord.MessageEmbed()
            .setTitle("Avertissement de " + user.username)
            .setColor(config.ColorEmbeds.Warn)
            .setTimestamp()
            .setFooter(config.FootersEmbed)
        if(list == []){
            embed.setDescription("Aucun avertisement d'enregistré.")
        }
        for (let i = 0; i < list.length; i++) {
            embed.addField("IDWarn : "+list[i].id+" | "+list[i].date, "Par: " + list[i].who + "\nPour raison: `" + list[i].reason + "`")
        }

        message.channel.send({ embeds: [embed] })
    }



}
