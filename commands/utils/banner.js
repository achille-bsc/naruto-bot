const Discord = require('discord.js')
const axios = require("axios")
const Banner = require('discord.js-banner')
const config = require('../../config.json')
const banner = new Banner(config.TOKEN);

module.exports = {
    name: "banner",
    description: "Récuperer l'avatar d'un membre",
    command: config.PREFIX + "avatar [<member>/serv]",

    async execute(message, args, client) {

        let embed = new Discord.MessageEmbed()
            .setColor(config.ColorEmbeds.Banner)
            .setFooter(config.FootersEmbed)
            .setTimestamp()
        ;

        if (args.length == 0) {

            const data = await axios.get(`https://discord.com/api/users/${message.author.id}`, {
                headers: {
                    Authorization: `Bot ${client.token}`
                }
            }).then(d => d.data);

            if (data.banner) {

                let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
                url = `https://cdn.discordapp.com/banners/${message.author.id}/${data.banner}${url}`;
                message.channel.send({ embeds: [embed.setTitle(`Votre bannière`).setImage(url)] })

            } else {
                message.channel.send({ embeds: [embed.setTitle("Vous n'avez pas de bannière")] })
            }
        } else {

            if (args[0] == "serv") {
                
                /*console.log(message.guild)
                const data = await axios.get(`https://cdn.discordapp.com/banners/942412805284438027`, {
                    headers: {
                        Authorization: `Bot ${client.token}`
                    }
                }).then(d => d.data);
                if (data.banner) {
                    let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
                    url = `https://cdn.discordapp.com/banners/${message.guild.id}/${message.guild.banner}${url}`;
                    message.channel.send({ embeds: [embed.setTitle(`Bannière du serveur`).setImage(url)] })
                } else { 

                }*/

                message.channel.send({ embeds: [embed.setTitle(`le serveur n'a pas de bannière`)] })
                return;
            }

            id = args[0].replace(/</g, '')
            id = id.replace(/>/g, '')
            id = id.replace(/!/g, '')
            id = id.replace(/@/g, '')

            message.guild.members.fetch()
            user = message.guild.members.cache.get(id)

            if (!user) return message.channel.send("Une erreur est survenue, ce membre est inrouvable.")

            const data = await axios.get(`https://discord.com/api/users/${id}`, {
                headers: {
                    Authorization: `Bot ${client.token}`
                }
            }).then(d => d.data);

            if (data.banner) {
                let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
                url = `https://cdn.discordapp.com/banners/${id}/${data.banner}${url}`;
                message.channel.send({ embeds: [embed.setTitle(`Bannière de ${user.user.username}`).setImage(url)] })
            } else {
                message.channel.send({ embeds: [embed.setTitle(`${user.user.username} n'a pas de bannière`)] })
            }

        }
    }

}


