const Discord = require('discord.js')
const config = require('../config.json')
const Invit = require("../files/Invit.json")
const fs = require('fs')

module.exports = {
    async execute(client) {
        client.on("guildMemberAdd", async member => {

            // AutoRoles
            config.welcomeRoles.forEach(async role=> {
                const roleToAdd = await member.guild.roles.cache.get(role)
                try {
                    member.roles.add(roleToAdd)
                } catch (error) {
                    return
                }
            });

            // Invitations
            const updatedInvites = await member.guild.invites.fetch();
            let usedInvite = "";

            for (invite of updatedInvites) {

                if (invite[1].uses > client.invites.get(invite[1].code).uses) {
                    usedInvite = invite[1].code;
                    await client.invites.set(invite[1].code, { uses: invite[1].uses, inviter: invite[1].inviterId });
                    break;
                };
            };
            let bool = false
            for (var i = 0; i < Invit.invite.length; i++) {
                if (Invit.invite[i].memberId == client.invites.get(usedInvite).inviter) {
                    Invit.invite[i].number++
                    Invit.invite[i].user.push(member.id)
                    nb = Invit.invite[i].number
                    bool = true;
                }
            }
            if (bool == false) {
                json = {
                    "memberId": client.invites.get(usedInvite).inviter,
                    "number": 1,
                    "user": [
                        member.id
                    ]
                }
                Invit.invite.push(json)
                nb = 1
            }
            let data = JSON.stringify(Invit);
            fs.writeFileSync('./files/invit.json', data, (err) => {
                if (err) throw err;
            });


            const chan = member.guild.channels.cache.get(config.ChanId.Welcome)
            const attachment = new Discord.MessageAttachment("./images/BIENVENUE.jpg", "Bienvenue.jpg")

            chan.send({

                content: "<@" + member.id + ">", embeds: [new Discord.MessageEmbed()
                    .setTitle("🎉 Bienvenue ! 🎉")
                    .setDescription(`Bienvenue à toi ${member.user.username} sur le serveur ${member.guild.name} !\nTout le staff te souhaite une bonne visite !\nTu a été invité par **<@${client.invites.get(usedInvite).inviter}>**, il a désormais dans son compteur **${nb}** invitation(s).`)
                    .setTimestamp()
                    .setColor(config.ColorEmbeds.Welcome)
                    .setImage("attachment://Bienvenue.jpg")
                ], files: [attachment]
                
            })
        })
    }
}