const Discord = require('discord.js')
const config = require('../../config')

module.exports = {
    name: "say",
    description: "Envoyer un message",
    command: config.PREFIX+"say <message>",

    async execute(message, args, client) {

        if(args.length == 0) return message.channel.send("Merci de spécifier le message. `"+this.command+"`")
        
        const msg = args.splice(0).join(" ")

        message.channel.send(msg)
        message.delete()

    }

}