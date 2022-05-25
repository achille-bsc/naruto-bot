const { MessageEmbed } = require('discord.js')
const config = require("../../config.json")

module.exports = {
    name: "unmute",
    description: "Pour rendre la voix à un membre du serveur",
    command: config.PREFIX+"unmute <membre>",

    execute(message, args, client) {

        // Vérifier si le membre est mentionné. Si oui, on l'attribue à 
        if (!args[0]) return message.channel.send("Veuillez mentionner un membre à unMute");
        const member = (message.mentions.members.first() == null) ? message.guild.members.cache.get(args[0]) : message.mentions.members.first()
        
        // Si le membre est introuvable, on renvoit un message d'erreur
        if (!member) {
            return message.reply({ embeds: [new MessageEmbed().setTitle('Le membre est introuvable').setColor("RED").setFooter(config.FootersEmbed)] });
        }

        if (member.user.bot) return message.reply({ embeds: [new MessageEmbed().setTitle('Le membre à unmute ne peut pas être un bot').setColor("RED").setFooter(config.FootersEmbed)] });
        
        member.timeout(null)
        message.reply({ embeds: [new MessageEmbed().setTitle(`Le membre ${member.user.username} à correctement été unMute !`).setColor("GREEN").setFooter(config.FootersEmbed)] })
    }
}