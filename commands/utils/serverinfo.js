const Discord = require('discord.js')
const config = require("../../config.json")
const moment = require('moment')

module.exports = {
    name: "serverinfo",
    description: "Avoir les information du serveur Discord et Minecraft",
    command: config.PREFIX + "serverinfo",
    alias: "si",

    async execute(message, args, client) {

        const guild = message.guild
        let members = 0
        let bots = 0

        await guild.members.fetch()

        guild.members.cache.forEach(member => {

            if (!member.user.bot) members++
            else bots++
        
        })

        const embed = new Discord.MessageEmbed()
            .setTitle("Statistics")
            .setColor(config.ColorEmbeds.ServerInfo)
            .setTimestamp()
            .setFooter(config.FootersEmbed)
            .setDescription("Voici toutes les statistiques du serveur " + message.guild.name + " et du serveur Minecraft:")
            .addField("Proprietaire: ", guild.members.cache.get(guild.ownerId).user.username + guild.members.cache.get(guild.ownerId).user.discriminator, true)
            .addField("ID :", message.guild.id, true)
            .addField("Membres :", members + "", true)
            .addField("Bot(s) :", bots + "", true)
            .addField("Role(s) :", (message.guild.roles.cache.size - 1).toString(), true)
            .addField("Boost(s) :", guild.premiumSubscriptionCount.toString(), true)
            .addField("Date de création :", moment.utc(guild.createdAt).format("DD/MM/YYYY | hh:mm:ss"), true)
            .addField("Niveau de vérification :", message.guild.verificationLevel, true)
            .addField("Information du serveur Minecraft: ", "-------------------------------------")
            .addField("Joueur(s) connecté(e): ", "...", true)
            .addField("Joueur(s) total(s): ", "...", true)
            .addField("Status Proxy", "...", false)
            .addField("Status serveur Lobby: ", "...", true)
            .addField("Status serveur Minage: ", "...", true)
            .addField("Status serveur Faction: ", "...", true)
            .setThumbnail(message.guild.iconURL())
        ;
        
        message.channel.send({ embeds: [embed] })
    }
}