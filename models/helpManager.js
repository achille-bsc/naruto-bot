const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
    async interaction(interaction, client){

        if (interaction.values == '1') {

            const embed = new Discord.MessageEmbed()
                .setTitle("────────༺ Help ༻────────")
                .setColor(config.ColorEmbeds.HelpCommand)
                .setDescription(`> Information du bot NarutoBot développer par __<@330389588549828610> et <@688098375697956905>__\n
                Verions du bot: 1.0-alpha\n
                ...\n
                **Les differentes commandes disponible du bot: **`)
                .addField("Commandes utilitaire:", "> Page 2/4", true)
                .addField("Commandes modérateur:", "> Page 3/4", true)
                .addField("Commandes administrateur:", "> Page 4/4", true)
                .setTimestamp()
                .setFooter(`${config.FootersEmbed} • 1/4`)
            ;

            interaction.update({ embeds: [embed] })
        }
        if (interaction.values == '2') {
            let helpUtilEmbed = new Discord.MessageEmbed()
                .setTitle("───────༺ Commandes utilisateur ༻───────")
                .setColor(config.ColorEmbeds.HelpCommand)
                .setTimestamp()
                .setFooter(`${config.FootersEmbed} • 2/4`)

            client.commandsUtils.forEach((cmd) => {

                helpUtilEmbed.addField(
                    `**${config.PREFIX}${cmd.name} ${cmd.alias ? `(${cmd.alias})` : ""}**`,
                    `${cmd.description}`,
                    true
                );
            });

            interaction.update({ embeds: [helpUtilEmbed] })
        }
        if (interaction.values == '3') {

            let helpModoEmbed = new Discord.MessageEmbed()
                .setTitle("────────༺ Commandes modérateur ༻────────")
                .setColor(config.ColorEmbeds.HelpCommand)
                .setTimestamp()
                .setFooter(`${config.FootersEmbed} • 3/4`)
            ;

            client.commandsModo.forEach((cmd) => {

                helpModoEmbed.addField(
                    `**${config.PREFIX}${cmd.name} ${cmd.alias ? `(${cmd.alias})` : ""}**`,
                    `${cmd.description}`,
                    true
                );

            });

            interaction.update({ embeds: [helpModoEmbed] })
        }
        
        if (interaction.values == '4') {
            let helpAdminEmbed = new Discord.MessageEmbed()
                .setTitle("───────༺ Commandes administrateur ༻───────")
                .setColor(config.ColorEmbeds.HelpCommand)
                .setTimestamp()
                .setFooter(`${config.FootersEmbed} • 4/4`)
            ;

            client.commandsAdmin.forEach((cmd) => {

                helpAdminEmbed.addField(
                    `**${config.PREFIX}${cmd.name} ${cmd.alias ? `(${cmd.alias})` : ""}**`,
                    `${cmd.description}`,
                    true
                );

            });
            
            interaction.update({ embeds: [helpAdminEmbed] })
        }
    }
}