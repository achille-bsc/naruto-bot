const Discord = require('discord.js')
const config = require("../../config.json")
const banWorlds = require("../../files/banWorlds.json")
const fs = require("fs")

module.exports = {
    name: "automod",
    description: "gestion de l'auto modération",
    command: config.PREFIX + "automod <addbanlink/removebanlink/addbanworld/removebanworld> [parametre]",

    async execute(message, args, client) {

        if (args.length == 0) {
            return message.channel.send("Merci de spécifier la commande après. `" + this.command + "`")
        }
        if (args.length == 1) {
            return message.channel.send("Merci de spécifier le parametre après la commande. `" + this.command + "`")
        }
        if (args[0] == "addbanlink") {
            banWorlds.links.push(args[1])
            this.save(message)
            return
        }
        if (args[0] == "removebanlink") {
            banWorlds.links.splice(banWorlds.links.indexOf(args[1]), 1)
            this.save(message)
            return
        }
        if (args[0] == "addbanworld") {
            banWorlds.worlds.push(args[1])
            this.save(message)
            return
        }
        if (args[0] == "removebanworld") {
            banWorlds.worlds.splice(banWorlds.links.indexOf(args[1]), 1)
            this.save(message)
            return
        }
        return message.channel.send("Erreur de syntaxe. `" + command + "`")
    },
    save(message) {
        let data = JSON.stringify(banWorlds);
        fs.writeFileSync('files/banWorlds.json', data, (err) => {
            if (err) throw err;
        });
        message.channel.send("Mise à jours fait !")
    }
}
