const Discord = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: "ping",
    description: "Savoir la latence du bot",
    command: config.PREFIX+"ping",

    async execute (message, args, client){
        message.channel.send(`🏓 La latance du bot est de ${Math.round(client.ws.ping)}ms`)
    }

}