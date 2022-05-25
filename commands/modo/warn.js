const Discord = require('discord.js')
const warnManager = require('../../models/warnManager.js')
const config = require("../../config.json")

module.exports = {
    name: "warn",
    description: "Avertir un membre",
    command: config.PREFIX + "warn <member> <reason>",

    async execute (message, args, client){

        if(args.length < 2) return message.channel.send("Merci de spécifier le membre et la raison. `" + this.command + "`")
        
        id = args[0].replace(/</g, '')
        id = id.replace(/>/g, '')
        id = id.replace(/!/g, '')
        id = id.replace(/@/g, '')

        user = message.guild.members.cache.get(id).user
        reason = msg = args.splice(1).join(" ")
        warnManager.warn(message, user, reason, message.author)
        message.delete();
    }


    
}
