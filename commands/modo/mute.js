const { MessageEmbed } = require('discord.js')
const config = require("../../config.json")
const ms = require('ms');

module.exports = {
    name: "mute",
    description: "Pour rendre muet un membre du serveur",
    command: config.PREFIX+"mute <membre> [raison]",

    execute(message, args, client) {

        // Vérifier si le membre est mentionné. Si oui, on l'attribue à member
        if (!args[0]) return message.channel.send("Veuillez mentionner un membre à mute");
        const member = (message.mentions.members.first() == null) ? message.guild.members.cache.get(args[0]) : message.mentions.members.first()

        // Attribution de la raison
        let reason = args.splice(1)
        if (!reason) {
            reason = 'Aucune raison rensseigné'
        }
        
        // Si le membre est introuvable, on renvoit un message d'erreur
        if (!member) {
            return message.reply({ embeds: [new MessageEmbed().setTitle('Le membre est introuvable').setColor("RED").setFooter(config.FootersEmbed)] });
        }
        
        if (member.user.bot) return message.reply({ embeds: [new MessageEmbed().setTitle('Le membre à mute ne peut pas être un bot').setColor("RED").setFooter(config.FootersEmbed)] });

        member.timeout(28 * 24 * 60 * 60 * 1000, reason)

        message.reply({ embeds: [new MessageEmbed().setTitle(`Le membre ${member.user.username} à correctement été mute !`).setColor("GREEN").setFooter(config.FootersEmbed)] })
    }
}