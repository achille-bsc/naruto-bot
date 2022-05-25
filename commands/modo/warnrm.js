const Discord = require('discord.js')
const wait = require("timers/promises").setTimeout;
const warnManager = require('../../models/warnManager.js')
const config = require("../../config.json")

module.exports = {
    name: "warnrm",
    description: "Retiré un avertissement d'un joueur",
    command: config.PREFIX + "warnrm <member> <idWarn>",

    async execute (message, args, client){

        if(args.length != 2) return message.channel.send("Merci de spécifier le membre et la raison. `" + this.command + "`")
        id = args[0].replace(/</g, '')
        id = id.replace(/>/g, '')
        id = id.replace(/!/g, '')
        id = id.replace(/@/g, '')
        user = message.guild.members.cache.get(id).user
        idwarn = args.splice(1).join(" ")
        warnManager.remove(id, idwarn).then(resp => {
            if(resp == true){
                message.channel.send({embeds:[new Discord.MessageEmbed()
                    .setTitle("Avertissement suprimé")
                    .setDescription("L'avertissement numero "+idwarn+" de "+user.username+" à bien été suprimé !")
                    .setColor(config.ColorEmbeds.Warn)
                    .setTimestamp()
                    .setFooter(config.FootersEmbed)
                ]})
            }else{
                message.channel.send({embeds:[new Discord.MessageEmbed()
                    .setTitle("Avertissement suprimé")
                    .setDescription("L'avertissement numero "+idwarn+" de "+user.username+" n'a pas été trouver. \nPour voir la liste des avertissement d'un joueur: `+warnlist <member>`")
                    .setColor(config.ColorEmbeds.Warn)
                    .setTimestamp()
                    .setFooter(config.FootersEmbed)
                ]})
            }
        })
    }


    
}
