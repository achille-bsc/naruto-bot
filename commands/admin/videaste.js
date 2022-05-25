const Discord = require('discord.js')
const fs = require("fs")
const config = require("../../config.json")
const permissions = require("../../files/permissions.json")
module.exports = {
    name: "videaste",
    description: "Gerer les permissions du bot",
    command: config.PREFIX + "permission <add/remove/list> <command> [<role>]",
    alias: "perm",
    execute(message, args, client) {
        if (args.length == 0) {
            return message.channel.send("Merci de présiser l'argument add ou remove après la commande. `" + this.command + "`")
        }
        if (args.length == 1 && args[0] != "list") {
            return message.channel.send("Merci de présiser la commande en question après la commande. `" + this.command + "`")
        }
        if (args[0] == "list") {
          
          const videasteliste = config.videastList
          if(videasteliste.length === 0) {
            const embed = new Discord.MessageEmbed()
              .setTitle('Liste des chaines vidéastes')
              .setDescription('Aucune chaine n\'est actuellement disponnible !')
              .setFooter(config.FootersEmbed)
          } else {
            const embed = new Discord.MessageEmbed()
              .setTitle('Liste des chaines vidéastes')
            ;
            videasteliste.forEach(async chaine => {
              client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${chaine}`)
                .then(data => {

                  const name = data.items[0]
                  embed.addField(name, `https://www.youtube.com/channel/${chaine}`)
                ;
                
              })
            })
            message.channel.send({ embeds: [embed] })

          }

        }

        if (args[0] == "add") {
          
          const videasteliste = config.videastList
          const channel = await client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${args[2]}`)


        }

        if (args[0] == "remove") {

        }
            
    }
}