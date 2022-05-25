const Discord = require('discord.js')
const config = require("../../config.json")

module.exports = {
    name: "help",
    description: "Affiches toutes les commandes disponible.",
    command: config.PREFIX+"help [commande]",

    execute(message, arg, client) {

        let args = arg.splice(0).join(" ");

        if (args == "") {

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

            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('HelpSelect')
                        .setPlaceholder('Selectionnez votre page')
                        .addOptions([
                            {
                                label: 'Information',
                                description: "Page d'information",
                                value: '1',
                            },
                            {
                                label: 'Utils',
                                description: 'Commandes utilitaire',
                                value: '2',
                            },
                            {
                                label: 'Modo',
                                description: 'Commande pour les modérateur',
                                value: '3',
                            },
                            {
                                label: 'Admin',
                                description: 'Commande pour les administrateur',
                                value: '4',
                            },
                        ]),
                );

            message.reply({ embeds: [embed], components: [row] })

        } else {

            let bool = 0
            client.commandsUtils.forEach((cmd) => {

                if (cmd.name == args.split(" ")[0]) {

                    const embed = new Discord.MessageEmbed()
                        .setTitle("Help +" + cmd.name)
                        .addField("Description: ", cmd.description, true)
                        .addField("Syntaxe: ", "`" + cmd.command + "`", true)
                        .addField("Catégory: ", "🖋️ Utils 🖋️", true)
                        .setColor(config.ColorEmbeds.HelpCommand)
                        .setTimestamp()
                        .setFooter(`${config.FootersEmbed}`)
                    ;

                    if (cmd.alias) {
                        embed.addField("Alias :", "`'" + cmd.alias + "`", true)
                    }
                    
                    message.channel.send({ embeds: [embed] })
                    bool = 1
                }
            })

            client.commandsModo.forEach((cmd) => {

                if (cmd.name == args.split(" ")[0]) {

                    const embed = new Discord.MessageEmbed()
                        .setTitle("Help +" + cmd.name)
                        .addField("Description: ", cmd.description, true)
                        .addField("Syntaxe: ", "`" + cmd.command + "`", true)
                        .addField("Catégory: ", "👮 Modération 👮", true)
                        .setColor(config.ColorEmbeds.HelpCommand)
                        .setTimestamp()
                        .setFooter(`${config.FootersEmbed}`)
                    ;

                    if (cmd.alias) {
                        embed.addField("Alias :", "`'" + cmd.alias + "`", true)
                    }
                    message.channel.send({ embeds: [embed] })
                    bool = 1
                }
            })

            client.commandsAdmin.forEach((cmd) => {

                if (cmd.name == args.split(" ")[0]) {

                    const embed = new Discord.MessageEmbed()
                        .setTitle("Help +" + cmd.name)
                        .addField("Description: ", cmd.description, true)
                        .addField("Syntaxe: ", "`" + cmd.command + "`", true)
                        .addField("Catégory: ", "👑 Administrateur 👑", true)
                        .setColor(config.ColorEmbeds.HelpCommand)
                        .setTimestamp()
                        .setFooter(`${config.FootersEmbed}`)
                    ;

                    if (cmd.alias) {
                        embed.addField("Alias :", "`'" + cmd.alias + "`", true)
                    }

                    message.channel.send({ embeds: [embed] })
                    bool = 1
                }
            })
            
            if (bool == 0) {
                message.channel.send("Commande inconnue.")

            }


        }

    }

}