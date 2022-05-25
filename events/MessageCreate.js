const Discord = require('discord.js')
const config = require('../config.json')
const banWorlds = require("../files/banWorlds.json")
const perms = require('../files/permissions.json')
module.exports = {
  async execute(client) {
    client.on('messageCreate', async message => {
      if (message.author.bot) return;

      const args = message.content.trim().split(/ +/g)
      const commandName = args.shift().toLowerCase()
      var cmdName = commandName.replace(/'/g, '')
      if (commandName.startsWith(config.PREFIX)) {

        const commandExecute = client.commands.get(commandName.slice(config.PREFIX.length))
        if (!commandExecute) return
        // verif permissions
        if (client.commandsModo.get(commandName.slice(config.PREFIX.length)) && !message.guild.members.cache.get(message.author.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
          if (perms.find(obj => obj.name == commandName.slice(config.PREFIX.length))) {
            var searchField = "name";
            var searchVal = commandName.slice(config.PREFIX.length);
            var id2;
            for (var i = 0; i < perms.length; i++) {
              if (perms[i][searchField] == searchVal) {
                id2 = i;
              }
            }
            if (!perms[id2].perms.find(perm => message.guild.members.cache.get(message.author.id).roles.cache.find(role => role.id == perm))) {
              message.channel.send({
                embeds: [new Discord.MessageEmbed()
                  .setTitle("⚠️ Permissions insufisante ⚠️")
                  .setTimestamp()
                  .setColor(config.ColorEmbeds.NotPermissions)
                  .setFooter(config.FootersEmbed)
                  .setDescription(`${message.author.username} vous n'avez pas la permission d'éxécuter la commande: \`${commandName}\``)
                ]
              })
              return
            }
          } else {
            message.channel.send({
              embeds: [new Discord.MessageEmbed()
                .setTitle("⚠️ Permissions insufisante ⚠️")
                .setTimestamp()
                .setColor(config.ColorEmbeds.NotPermissions)
                .setFooter(config.FootersEmbed)
                .setDescription(`${message.author.username} vous n'avez pas la permission d'éxécuter la commande: \`${commandName}\``)
              ]
            })
            return
          }
        }
        if (client.commandsAdmin.get(commandName.slice(config.PREFIX.length)) && !message.guild.members.cache.get(message.author.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
          message.channel.send({
            embeds: [new Discord.MessageEmbed()
              .setTitle("⚠️ Permissions insufisante ⚠️")
              .setTimestamp()
              .setColor(config.ColorEmbeds.NotPermissions)
              .setFooter(config.FootersEmbed)
              .setDescription(`${message.author.username} vous n'avez pas la permission d'éxécuter la commande: \`${commandName}\``)
            ]
          })
          return
        }
        if (commandExecute.guildOnly || !message.guild || message.channel.type === "dm") return message.channel.send("Cette commande ne peut être utilisée que dans un serveur.");
        commandExecute.execute(message, args, client)
        return
      }
      if (!message.guild.members.cache.get(message.author.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
        if (banWorlds.worlds.some(world => message.content.toLowerCase().includes(world))) {
          message.channel.send("⚠️ " + message.author.username + ", vous venez d'utiliser un mot interdi !⚠️ ")
          message.delete()
          return;
        }
        if (banWorlds.links.some(world => message.content.toLowerCase().includes(world))) {
          message.channel.send("⚠️ " + message.author.username + ", vous venez d'envoyer un lien interdi !⚠️ ")
          message.delete()
          return;
        }
      }
    })
  }

}