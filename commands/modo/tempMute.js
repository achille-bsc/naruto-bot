const { MessageEmbed } = require('discord.js')
const config = require("../../config.json")
const ms = require('ms');

module.exports = {
    name: "tempmute",
    description: "Permet de muter un membre temporairement",
    command: config.PREFIX + "mute <membre> <durée> [raison]",

    execute(message, args, client) {

        // Vérifier si le membre est mentionné. Si oui, on l'attribue à 
        if (!args[0]) return message.channel.send("Veuillez mentionner un membre à mute");

        const member = (message.mentions.members.first() == null) ? message.guild.members.cache.get(args[0]) : message.mentions.members.first()
        let reason = args.splice(2)

        if (!reason) {
            reason = 'Aucune raison rensseigné'
        }

        const duree = ms(args[1])

        if (!duree) {
            return message.reply({ embeds: [new MessageEmbed().setTitle('Aucune durée n\'a été définit').setColor("RED").setFooter(config.FootersEmbed).setDescription('Veuillez rensseigner les informations sous ce format: `1j2h3m4s`')] })
        }

        // Si le membre est introuvable, on renvoit un message d'erreur
        if (!member) {
            return message.reply({ embeds: [new MessageEmbed().setTitle('Le membre est introuvable').setColor("RED").setFooter(config.FootersEmbed)] });
        }
        
        member.timeout(duree, reason);
        message.reply({ embeds: [new MessageEmbed().setTitle(`Le membre ${member.user.username} à correctement été mute !`).setColor("GREEN").setFooter(config.FootersEmbed).setDescription(``)] })

    }
}