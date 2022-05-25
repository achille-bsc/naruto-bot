const Discord = require('discord.js')
const config = require('../config.json')
const Invit = require("../files/Invit.json")
const fs = require('fs')

module.exports = {
    async execute(client){
        client.on("guildMemberRemove", async member => {

            // Invitation
            const updatedInvites = await member.guild.invites.fetch();
            let usedInvite = "";

            for (invite of updatedInvites) {

                if (invite[1].uses > client.invites.get(invite[1].code).uses) {
                    usedInvite = invite[1].code;
                    await client.invites.set(invite[1].code, { uses: invite[1].uses, inviter: invite[1].inviterId });
                    break;
                };
            };
            try {
                let bool = false
                for (let i = 0; i < Invit.invite.length; i++) {
                    for (let y = 0; y < Invit.invite[i].user.length; y++){
                        if(member.id == Invit.invite[i].user[y]){
                            Invit.invite[i].number--
                            Invit.invite[i].user.splice(y,1)
                        }
                    }
                }
                let data = JSON.stringify(Invit);
                fs.writeFileSync('./files/invit.json', data, (err) => {
                    if (err) throw err;
                });
    
    
    
            } catch (err) {
                return console.log(err)
            }
    

            const chan = member.guild.channels.cache.get(config.ChanId.Bye)
            const attachment = new Discord.MessageAttachment("./images/AuRevoir.jpg", "AuRevoir.jpg")

            chan.send({embeds: [new Discord.MessageEmbed()
                .setTitle("👋 Bye Bye ! 👋")
                .setDescription(`Au revoir ${member.user.username} !\nNous espérons que vous avez passé(e) un bon moment sur notre serveur !`)
                .setTimestamp()
                .setColor(config.ColorEmbeds.Bye)
                .setImage("attachment://AuRevoir.jpg")
            ], files: [attachment]})
            
        })
    }
}