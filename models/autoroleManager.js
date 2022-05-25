const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {

    async onInteract(interaction) {

        user = interaction.guild.members.cache.get(interaction.user.id)

        if(interaction.customId == "News"){

            if(user.roles.cache.some(role => role.id == config.autoRole.News)){
                user.roles.remove(config.autoRole.News)
                interaction.reply({ content: "On vous a enlever le rôle <@&"+config.autoRole.News+">", ephemeral: true })
            } else {
                user.roles.add(config.autoRole.News)
                interaction.reply({ content: "On vous a ajouter le rôle <@&"+config.autoRole.News+">", ephemeral: true })
            }

        }
        if(interaction.customId == "MAJ"){

            if(user.roles.cache.some(role => role.id == config.autoRole.MAJ)){
                user.roles.remove(config.autoRole.MAJ)
                interaction.reply({ content: "On vous a enlever le rôle <@&"+config.autoRole.MAJ+">", ephemeral: true })
            } else {
                user.roles.add(config.autoRole.MAJ)
                interaction.reply({ content: "On vous a ajouter le rôle <@&"+config.autoRole.MAJ+">", ephemeral: true })
            }

        }

        if(interaction.customId == "PatchNote"){
        
            if(user.roles.cache.some(role => role.id == config.autoRole.PatchNote)){
                user.roles.remove(config.autoRole.PatchNote)
                interaction.reply({ content: "On vous a enlever le rôle <@&"+config.autoRole.PatchNote+">", ephemeral: true })
            } else {
                user.roles.add(config.autoRole.PatchNote)
                interaction.reply({ content: "On vous a ajouter le rôle <@&"+config.autoRole.PatchNote+">", ephemeral: true })
            }

        }
        if(interaction.customId == "Vidéaste"){
            
            if(user.roles.cache.some(role => role.id == config.autoRole.Vidéaste)){
                user.roles.remove(config.autoRole.Vidéaste)
                interaction.reply({ content: "On vous a enlever le rôle <@&"+config.autoRole.Vidéaste+">", ephemeral: true })
            } else {
                user.roles.add(config.autoRole.Vidéaste)
                interaction.reply({ content: "On vous a ajouter le rôle <@&"+config.autoRole.Vidéaste+">", ephemeral: true })
            }
            
        }
        if(interaction.customId == "Règlement"){
            
            if(user.roles.cache.some(role => role.id == config.autoRole.Règlement)){
                user.roles.remove(config.autoRole.Règlement)
                interaction.reply({ content: "On vous a enlever le rôle <@&"+config.autoRole.Règlement+">", ephemeral: true })
            } else {
                user.roles.add(config.autoRole.Règlement)
                interaction.reply({ content: "On vous a ajouter le rôle <@&"+config.autoRole.Règlement+">", ephemeral: true })
            }
            
        }
        if(interaction.customId == "Sondage"){
            
            if(user.roles.cache.some(role => role.id == config.autoRole.Sondage)){
                user.roles.remove(config.autoRole.Sondage)
                interaction.reply({ content: "On vous a enlever le rôle <@&"+config.autoRole.Sondage+">", ephemeral: true })
            } else {
                user.roles.add(config.autoRole.Sondage)
                interaction.reply({ content: "On vous a ajouter le rôle <@&"+config.autoRole.Sondage+">", ephemeral: true })
            }
            
        }
        
    }


}