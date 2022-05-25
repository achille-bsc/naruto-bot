/*

pseudo ig
level metier: /35
    Guerrier
    Farmeur
    Mineur
    Alchimiste
Competances Ninja: /20
    Ninjutsu
    Genjutsu
    Kenjutsu
    Taijutsu
    Fûinjutsu 
    juinjutsu
    Senjutsu
    Dôjutsu
Skin
Pays
Clan
Village
Chakra
Nature de Chakra


*/

const Discord = require("discord.js")
const config = require("../../config.json")
const moment = require('moment')

module.exports = {
    name: "userinfo",
    description: "Avoir les information d'un joueur",
    command: config.PREFIX + "userinfo",
    alias: "ui",

    async execute(message, args, client) {

        if (args.length == 0) {

            user = message.guild.members.cache.get(message.author.id)
            roles = user.roles.member._roles
            nmRoles = 0
            let roleslist = []

            for (let i = 0; i < roles.length; i++) {
                roleslist.push(message.guild.roles.cache.get(roles[i]).name)
                nmRoles++
            }

            if (args.length == 0) {

                let embed1 = new Discord.MessageEmbed()
                let embed2 = new Discord.MessageEmbed()
                let embed3 = new Discord.MessageEmbed()
                
                embed1.setTitle("__🚧 Information Minecraft de " + user.user.username + " 🚧__")
                    .setColor(config.ColorEmbeds.UserInfo)
                ;

                // if member is login minecraft to discord
                embed1.addField("Pseudo: ", "...", true)
                    .addField("Pays: ", "...", true)
                    .addField("Clan", "...", true)
                    .addField("Village", "...", true)
                    .addField("Chakra: ", "...", true)
                    .addField("Nature de Chakra: ", "...", true)
                    .setThumbnail("https://crafatar.com/renders/body/64bc926f-d7a1-40e1-8e78-0f2724c01f24")
                ;

                embed2.setTitle("__🥷 Competances Ninja: 🥷__")
                    .addField("Ninjutsu", "0/20", true)
                    .addField("Genjutsu", "0/20", true)
                    .addField("Kenjutsu", "0/20", true)
                    .addField("Taijutsu", "0/20", true)
                    .addField("Fûinjutsu ", "0/20", true)
                    .addField("juinjutsu", "0/20", true)
                    .addField("Senjutsu", "0/20", true)
                    .addField("Dôjutsu", "0/20", true)
                    .setColor(config.ColorEmbeds.UserInfo)
                ;

                embed3.setTitle("__⚒️ Niveau des métiers: ⚒️__")
                    .addField("Guerrier", "0/35", true)
                    .addField("Farmieur", "0/35", true)
                    .addField("Mineur", "0/35", true)
                    .addField("Alchimiste", "0/35", true)
                    .setFooter(config.FootersEmbed)
                    .setColor(config.ColorEmbeds.UserInfo)
                    .setTimestamp()
                ;

                // else
                // embed1.addField("Le compte n'est pas connecter à Minecraft.", "")
                message.channel.send({
                    embeds: [new Discord.MessageEmbed()
                        .setTitle("__🚧 Information Discord de " + user.user.username + " 🚧__")
                        .setColor(config.ColorEmbeds.UserInfo)
                        .addField("Pseudo :", user.user.username, true)
                        .addField("ID :", user.user.id, true)
                        .addField((nmRoles == 0) ? "Rôle(s): [0]" : "Rôle(s) [" + nmRoles + "]", (roleslist.length == 0) ? "Aucun rôle" : roleslist.join(", "))
                        .addField("Date d'arrivée :", moment.utc(user.user.joinedAt).format("DD/MM/YYYY | hh:mm:ss"), true)
                        .addField("Date de création :", moment.utc(user.user.createdAt).format("DD/MM/YYYY | hh:mm:ss"), true)
                        .setThumbnail(message.author.displayAvatarURL({ format: `png`, dynamic: `true` })), embed1, embed2, embed3]
                    ,
                })
            }
        } else {

            id = args[0].replace(/</g, '')
            id = id.replace(/>/g, '')
            id = id.replace(/!/g, '')
            id = id.replace(/@/g, '')

            user = message.guild.members.cache.get(id)
            roles = user.roles.member._roles
            nmRoles = 0

            let roleslist = []

            for (let i = 0; i < roles.length; i++) {
                roleslist.push(message.guild.roles.cache.get(roles[i]).name)
                nmRoles++
            }

            let embed1 = new Discord.MessageEmbed()
            let embed2 = new Discord.MessageEmbed()
            let embed3 = new Discord.MessageEmbed()

            embed1.setTitle("__🚧 Information Minecraft de " + user.user.username + " 🚧__")
                .setColor(config.ColorEmbeds.UserInfo)

            // if member is login minecraft to discord
            embed1.addField("Pseudo: ", "...", true)
                .addField("Pays: ", "...", true)
                .addField("Clan", "...", true)
                .addField("Village", "...", true)
                .addField("Chakra: ", "...", true)
                .addField("Nature de Chakra: ", "...", true)
                .setThumbnail("https://crafatar.com/renders/body/64bc926f-d7a1-40e1-8e78-0f2724c01f24")
            ;

            embed2.setTitle("__🥷 Competances Ninja: 🥷__")
                .addField("Ninjutsu", "0/20", true)
                .addField("Genjutsu", "0/20", true)
                .addField("Kenjutsu", "0/20", true)
                .addField("Taijutsu", "0/20", true)
                .addField("Fûinjutsu ", "0/20", true)
                .addField("juinjutsu", "0/20", true)
                .addField("Senjutsu", "0/20", true)
                .addField("Dôjutsu", "0/20", true)
                .setColor(config.ColorEmbeds.UserInfo)
            ;

            embed3.setTitle("__⚒️ Niveau des métiers: ⚒️__")
                .addField("Guerrier", "0/35", true)
                .addField("Farmeur", "0/35", true)
                .addField("Mineur", "0/35", true)
                .addField("Alchimiste", "0/35", true)
                .setFooter(config.FootersEmbed)
                .setColor(config.ColorEmbeds.UserInfo)
                .setTimestamp()
            ;

            // else
            // embed1.addField("Le compte n'est pas connecter à Minecraft.", "")
            message.channel.send({

                embeds: [new Discord.MessageEmbed()
                    .setTitle("__🚧 Informations Discord de " + user.user.username + " 🚧__")
                    .setColor(config.ColorEmbeds.UserInfo)
                    .addField("Pseudo :", user.user.username, true)
                    .addField("ID :", user.user.id, true)
                    .addField((nmRoles == 0) ? "Rôle(s): [0]" : "Rôle(s) [" + nmRoles + "]", (roleslist.length == 0) ? "Aucun rôle" : roleslist.join(", "))
                    .addField("Date d'arrivée :", moment.utc(user.user.joinedAt).format("DD/MM/YYYY | hh:mm:ss"), true)
                    .addField("Date de création :", moment.utc(user.user.createdAt).format("DD/MM/YYYY | hh:mm:ss"), true)
                    .setThumbnail(user.user.displayAvatarURL({ format: `png`, dynamic: `true` })), embed1, embed2, embed3]
                ,
            })

        }
    }
}