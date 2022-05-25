const Discord = require('discord.js')
const fs = require("fs")
const config = require("../../config.json")
const permissions = require("../../files/permissions.json")
module.exports = {
    name: "permission",
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
            let str = ""
            let cmd = args[1]
            if (!client.commands.get(args[1])) {
                return message.channel.send("Arguments manquants ! Veuillez suivre la syntaxe suivante : `&permission list <commande>`")
            }
            if (client.commandsUtils.get(args[1])) {
                return message.channel.send("Une erreur est survenue, les commandes de la cathégorie Utilitaire n'est pas configurable. `Tout le monde y a accée.`")
            }
            if (permissions.find(obj => obj.name == args[1])) {
                var searchField = "name";
                var searchVal = args[1];
                var id2;
                for (var i = 0; i < permissions.length; i++) {
                    if (permissions[i][searchField] == searchVal) {
                        id2 = i;
                    }
                }
                permissions[id2].perms.forEach(perm => {
                    if (str == "") {
                        str = "<@&" + perm + ">"
                    } else {
                        str = str + ",\n<@&" + perm + ">"
                    }
                })
            }
            
            message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Liste des permissions de " + cmd)
                    .setDescription(str)
                    .setColor(config.ColorEmbeds.Perms)
                    .setFooter(config.FootersEmbed)
                    .setTimestamp()
                ]
            })


            return
        }
        if (args.length == 2) {
            return message.channel.send("Merci de présiser le rôle après la commande. `" + this.command + "`")
        }

        if (args[0] == "add") {
            let cmd = args[1]
            id = args[2].replace(/</g, '')
            id = id.replace(/>/g, '')
            id = id.replace(/!/g, '')
            id = id.replace(/@/g, '')
            id = id.replace(/&/g, '')
            if (!message.guild.roles.cache.find(role => role.id == id)) {
                return message.channel.send("Une erreur est survenue, le role est introuvable.")
            }
            if (!client.commands.get(args[1])) {
                return message.channel.send("Une erreur est survenue, la commande est introuvable.")
            }
            if (client.commandsUtils.get(args[1])) {
                return message.channel.send("Une erreur est survenue, les commandes de la cathégorie Utilitaire n'est pas configurable. `Tout le monde y a accée.`")
            }
            if (permissions.find(obj => obj.perms.includes(id)) && permissions.find(obj => obj.perms.includes(id)).name == args[1]) {
                permissions.forEach(obj => console.log(obj))
                return message.channel.send("Une erreur est survenue, la permission est déjà active sur cette commande.")
            }
            if (permissions.find(obj => obj.name == args[1])) {
                var searchField = "name";
                var searchVal = args[1];
                var id2;
                for (var i = 0; i < permissions.length; i++) {
                    if (permissions[i][searchField] == searchVal) {
                        id2 = i;
                    }
                }
                permissions[id2].perms.push(id)
            } else {
                let list = []
                list.push(id)
                let json = {
                    name: cmd,
                    perms: list
                }
                permissions.push(json)
            }
            let data = JSON.stringify(permissions);
            fs.writeFileSync('files/permissions.json', data, (err) => {
                if (err) throw err;
            });
            message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Permissions")
                    .setTimestamp()
                    .setFooter(config.FootersEmbed)
                    .setDescription(`Les permissions de la commande ${cmd} à bien été mis à jours en ajoutant le rôle <@&${id}> !`)
                    .setColor(config.ColorEmbeds.Perms)
                ]
            })
        }
        if (args[0] == "remove") {
            let cmd = args[1]
            id = args[2].replace(/</g, '')
            id = id.replace(/>/g, '')
            id = id.replace(/!/g, '')
            id = id.replace(/@/g, '')
            id = id.replace(/&/g, '')
            if (!message.guild.roles.cache.find(role => role.id == id)) {
                return message.channel.send("Une erreur est survenue, le role est introuvable.")
            }
            if (!client.commands.get(args[1])) {
                return message.channel.send("Une erreur est survenue, la commande est introuvable.")
            }
            if (client.commandsUtils.get(args[1])) {
                return message.channel.send("Une erreur est survenue, les commandes de la cathégorie Utilitaire n'est pas configurable. `Tout le monde y a accée.`")
            }
            if (!permissions.find(obj => obj.perms.includes(id))) {
                return message.channel.send("Une erreur est survenue, la permission n'est pas active sur cette commande.")
            }

            var searchField = "name";
            var searchVal = args[1];
            var id2;
            for (var i = 0; i < permissions.length; i++) {
                if (permissions[i][searchField] == searchVal) {
                    id2 = i;
                }
            }
            permissions[id2].perms.splice(permissions[id2].perms.indexOf(id), 1)

            let data = JSON.stringify(permissions);
            fs.writeFileSync('files/permissions.json', data, (err) => {
                if (err) throw err;
            });
            message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Permissions")
                    .setTimestamp()
                    .setFooter(config.FootersEmbed)
                    .setDescription(`Les permissions de la commande ${cmd} à bien été mis à jours en retirant le rôle <@&${id}> !`)
                    .setColor(config.ColorEmbeds.Perms)
                ]
            })

        }

    }
}