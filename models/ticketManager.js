const Discord = require('discord.js')
const ticketjson = require("../files/ticket.json")
const config = require('../config.json')
const fs = require('fs')
const fs2 = require('fs').promises;
const TicketLogs = require('./TicketLogs.js')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;

module.exports = {

    async create(interaction, client) {

        let user = interaction.user
        
        if (ticketjson.Tickets.some(ticket => ticket.name == user.username)) {
            user.send("Vous avez déjà un ticket de crée.")
            return;
        
        }
        
        if (interaction.customId == "Support") {

            //Création du ticket de support
           

            permsList = []
            
            permsList.push({
                id: interaction.message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            })
            
            permsList.push({
                id: user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
            })

            for (let i = 0; i < config.ticketPermission.support.length; i++) {
                permsList.push(config.ticketPermission.support[i])
            }

            var chan = interaction.message.guild.channels.create("Ticket " + user.username + user.discriminator, {
                type: "text",
                parent: config.CatId.Tickets,
                permissionOverwrites: permsList
            }).then(chan => {

                ticketjson.Tickets.push({
                    "name": user.username,
                    "id": ticketjson.nombreTickets + 1,
                    "idChannel": chan.id,
                    "category": "Support",
                    "idMsgConf": "",
                    "idMsgWelcom": "",
                    "idMsgClose": "",
                })

                ticketjson.nombreTickets = ticketjson.nombreTickets + 1
                let data = JSON.stringify(ticketjson);

                fs.writeFileSync('files/ticket.json', data, (err) => {
                    if (err) throw err;
                });

                const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setCustomId("Close")
                        .setLabel("Close")
                        .setStyle("DANGER")
                        .setEmoji("🔒")
                    ,
                )

                TicketLogs("Ticket-" + user.username + user.discriminator, "Nouveau ticket", "Support", ticketjson.nombreTickets + 1, user, "#10a037", client)
                chan.send("<@&"+config.staffIdRole+"> ,  <@" + user + ">")
                
                chan.send({

                    embeds: [new Discord.MessageEmbed()
                        .setColor("#a4b95b")
                        .setTitle("👮 Bienvenue dans la Catégorie **Support** 👮")
                        .setDescription(`Un membre du Support va bientôt vous répondre...
                        Merci de décrire votre demande en spécifient la raison.`)
                        .setThumbnail(user.displayAvatarURL({ format: `png`, dynamic: `true` }))
                        .setTimestamp()
                    ], components: [row]

                }).then(msg => {

                    var searchField = "idChannel";
                    var searchVal = msg.channel.id;
                    var id;

                    for (var i = 0; i < ticketjson.Tickets.length; i++) {
                        if (ticketjson.Tickets[i][searchField] == searchVal) {
                            id = i;
                        }
                    }

                    ticketjson.Tickets[id].idMsgWelcom = msg.id

                    let data = JSON.stringify(ticketjson);

                    fs.writeFileSync('files/ticket.json', data, (err) => {
                        if (err) throw err;
                    });

                    interaction.reply({ content: "Votre ticket à été crée <#" + chan.id + ">", ephemeral: true })

                })

            }).catch(console.error);
        }

        if (interaction.customId == "Administration") {

            //Création du ticket d'administration
            

            permsList = []

            permsList.push({
                id: interaction.message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            })

            permsList.push({
                id: user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
            })

            for (let i = 0; i < config.ticketPermission.administration.length; i++) {
                permsList.push(config.ticketPermission.administration[i])
            }

            var chan = interaction.message.guild.channels.create("Ticket " + user.username + user.discriminator, {
                type: "text",
                parent: config.CatId.Tickets,
                permissionOverwrites: permsList
            }).then(chan => {

                ticketjson.Tickets.push({
                    "name": user.username,
                    "id": ticketjson.nombreTickets + 1,
                    "idChannel": chan.id,
                    "category": "Admin",
                    "idMsgConf": "",
                    "idMsgWelcom": "",
                    "idMsgClose": "",
                })

                ticketjson.nombreTickets = ticketjson.nombreTickets + 1
                let data = JSON.stringify(ticketjson);

                fs.writeFileSync('files/ticket.json', data, (err) => {
                    if (err) throw err;
                });

                TicketLogs("Ticket-" + user.username + user.discriminator, "Nouveau ticket", "Admin", ticketjson.nombreTickets + 1, user, "#10a037", client)

                const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setCustomId("Close")
                        .setLabel("Close")
                        .setStyle("DANGER")
                        .setEmoji("🔒")
                    ,
                )

                chan.send("<@&"+config.staffIdRole+"> ,  <@" + user + ">")

                chan.send({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("#a4b95b")
                        .setTitle("👑 Bienvenue dans la Catégorie **Administration** 👑")
                        .setDescription(`Un Administrateur va bientôt venir vous répondre dans quelque instant...
                        Veuillez détaillé votre problème.`)
                        .setThumbnail(user.displayAvatarURL({ format: `png`, dynamic: `true` }))
                        .setTimestamp()
                    ], components: [row]
                }).then(msg => {
                    var searchField = "idChannel";
                    var searchVal = msg.channel.id;
                    var id;

                    for (var i = 0; i < ticketjson.Tickets.length; i++) {
                        if (ticketjson.Tickets[i][searchField] == searchVal) {
                            id = i;
                        }
                    }

                    ticketjson.Tickets[id].idMsgWelcom = msg.id

                    let data = JSON.stringify(ticketjson);

                    fs.writeFileSync('files/ticket.json', data, (err) => {
                        if (err) throw err;
                    });

                    interaction.reply({ content: "Votre ticket à été crée <#" + chan.id + ">", ephemeral: true })

                })

            }).catch(console.error);

        }

        if (interaction.customId == "Recrutement") {

            //Création du ticket de recrutement

            permsList = []

            permsList.push({
                id: interaction.message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            })
            
            permsList.push({
                id: user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
            })

            for (let i = 0; i < config.ticketPermission.recrutement.length; i++) {
                permsList.push(config.ticketPermission.recrutement[i])
            }

            var chan = interaction.message.guild.channels.create("Ticket " + user.username + user.discriminator, {
                type: "text",
                parent: config.CatId.Tickets,
                permissionOverwrites: permsList
            }).then(chan => {

                ticketjson.Tickets.push({
                    "name": user.username,
                    "id": ticketjson.nombreTickets + 1,
                    "idChannel": chan.id,
                    "category": "Recru",
                    "idMsgConf": "",
                    "idMsgWelcom": "",
                    "idMsgClose": "",
                })

                ticketjson.nombreTickets = ticketjson.nombreTickets + 1
                let data = JSON.stringify(ticketjson);

                fs.writeFileSync('files/ticket.json', data, (err) => {
                    if (err) throw err;
                });

                TicketLogs("Ticket-" + user.username + user.discriminator, "Nouveau ticket", "Recru", ticketjson.nombreTickets + 1, user, "#10a037", client)

                const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setCustomId("Close")
                        .setLabel("Close")
                        .setStyle("DANGER")
                        .setEmoji("🔒")
                    ,
                )

                chan.send("<@&"+config.staffIdRole+"> ,  <@" + user + ">")

                chan.send({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("#a4b95b")
                        .setTitle("📖 Bienvenue dans la Catégorie **Recrutement** 📖")
                        .setDescription(`Votre dossier candidat est maintenant ouvert, voici les 2 étapes à suivre :
                        1. Pseudo
                        2. Dans quel équipe voulez vous être.

                        Une fois ceci fait le responsable de l'équipe en question viendra vous donner le formulaire de recrutement et vous expliquera les prochaine étapes.`)
                        .setThumbnail(user.displayAvatarURL({ format: `png`, dynamic: `true` }))
                        .setTimestamp()
                    ], components: [row]
                }).then(msg => {

                    var searchField = "idChannel";
                    var searchVal = msg.channel.id;
                    var id;

                    for (var i = 0; i < ticketjson.Tickets.length; i++) {
                        if (ticketjson.Tickets[i][searchField] == searchVal) {
                            id = i;
                        }
                    }

                    ticketjson.Tickets[id].idMsgWelcom = msg.id

                    let data = JSON.stringify(ticketjson);

                    fs.writeFileSync('files/ticket.json', data, (err) => {
                        if (err) throw err;
                    });

                    interaction.reply({ content: "Votre ticket à été crée <#" + chan.id + ">", ephemeral: true })
                })
                

            }).catch(console.error);

        }
        if (interaction.customId == "Autre") {

            //Création du ticket autre

            permsList = []

            permsList.push({
                id: interaction.message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            })

            permsList.push({
                id: user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
            })

            for (let i = 0; i < config.ticketPermission.autre.length; i++) {
                permsList.push(config.ticketPermission.autre[i])
            }

            var chan = interaction.message.guild.channels.create("Ticket " + user.username + user.discriminator, {
                type: "text",
                parent: config.CatId.Tickets,
                permissionOverwrites: permsList
            }).then(chan => {

                ticketjson.Tickets.push({
                    "name": user.username,
                    "id": ticketjson.nombreTickets + 1,
                    "idChannel": chan.id,
                    "category": "Autre",
                    "idMsgConf": "",
                    "idMsgWelcom": "",
                    "idMsgClose": "",
                })

                ticketjson.nombreTickets = ticketjson.nombreTickets + 1
                let data = JSON.stringify(ticketjson);

                fs.writeFileSync('files/ticket.json', data, (err) => {
                    if (err) throw err;
                });

                TicketLogs("Ticket-" + user.username + user.discriminator, "Nouveau ticket", "Autre", ticketjson.nombreTickets + 1, user, "#10a037", client)

                const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setCustomId("Close")
                        .setLabel("Close")
                        .setStyle("DANGER")
                        .setEmoji("🔒")
                    ,
                )

                chan.send("<@&"+config.staffIdRole+"> ,  <@" + user + ">");

                chan.send({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("#a4b95b")
                        .setTitle("📩 Bienvenue dans la Catégorie **Autre** 📩")
                        .setDescription(`Décrivez votre demande, un membre du support viendra vous répondre...`)
                        .setThumbnail(user.displayAvatarURL({ format: `png`, dynamic: `true` }))
                        .setTimestamp()
                    ], components: [row]
                }).then(msg => {

                    var searchField = "idChannel";
                    var searchVal = msg.channel.id;
                    var id;

                    for (var i = 0; i < ticketjson.Tickets.length; i++) {
                        if (ticketjson.Tickets[i][searchField] == searchVal) {
                            id = i;
                        }
                    }

                    ticketjson.Tickets[id].idMsgWelcom = msg.id

                    let data = JSON.stringify(ticketjson);

                    fs.writeFileSync('files/ticket.json', data, (err) => {
                        if (err) throw err;
                    });

                    interaction.reply({ content: "Votre ticket à été crée <#" + chan.id + ">", ephemeral: true })
                })
                

            }).catch(console.error);

        }

    },


    async confClose(interaction) {

        let user = interaction.user
        channel = interaction.message.channel

        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId("Confirm")
                .setLabel("Confirm")
                .setStyle("SUCCESS")
                .setEmoji("✅")
            ,

            new Discord.MessageButton()
                .setCustomId("Cancel")
                .setLabel("Cancel")
                .setStyle("DANGER")
                .setEmoji("❎")
            ,
        )

        channel.send({
            embeds: [new Discord.MessageEmbed()
                .setTitle("Confirmation")
                .setColor("#a4b95b")
                .setDescription("Etes vous sûr de vouloir fermer le ticket ?")
            ], components: [row]
        })
            .then(msg => {

                var searchField = "idChannel";
                var searchVal = channel.id;
                var id;

                for (var i = 0; i < ticketjson.Tickets.length; i++) {
                    if (ticketjson.Tickets[i][searchField] == searchVal) {
                        id = i;
                    }
                }

                ticketjson.Tickets[id].idMsgConf = msg.id

                let data = JSON.stringify(ticketjson);

                fs.writeFileSync('files/ticket.json', data, (err) => {
                    if (err) throw err;
                });

            })
            
            interaction.deferUpdate()
    },




    async close(interaction, client) {
        let user = interaction.user

        var searchField = "idChannel";
        var searchVal = interaction.message.channel.id;
        var id;
        for (var i = 0; i < ticketjson.Tickets.length; i++) {
            if (ticketjson.Tickets[i][searchField] == searchVal) {
                id = i;
            }
        }
        if (interaction.message.id != ticketjson.Tickets[id].idMsgConf) {
            return;
        }
        interaction.message.delete()

        //Ticket fermé, en cours de déstruction
        TicketLogs(interaction.message.channel.name, "Fermeture en cours", ticketjson.Tickets[id].category, ticketjson.Tickets[id].id, user, "#f4c120", client)

        interaction.message.channel.permissionOverwrites.set([
            {
                id: interaction.message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            },
            {
                id: user.id,
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            }
        ])


        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId("Save")
                .setLabel("Save")
                .setStyle("PRIMARY")
                .setEmoji("⏬"),
            new Discord.MessageButton()
                .setCustomId("Delete")
                .setLabel("Delete")
                .setStyle("DANGER")
                .setEmoji("🛑")
        )


        interaction.message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setTitle("Ticket fermé")
                .setColor("#a4b95b")
                .setDescription("Ce ticket a été fermé, Voulez-vous l'enregistré ? ⏬ \nVoulez-vous définitivement le férmer ? 🛑")
            ], components: [row]
        }).then(msg => {
            var searchField = "idChannel";
            var searchVal = interaction.channel.id;
            var id;
            for (var i = 0; i < ticketjson.Tickets.length; i++) {
                if (ticketjson.Tickets[i][searchField] == searchVal) {
                    id = i;
                }
            }
            ticketjson.Tickets[id].idMsgClose = msg.id

            let data = JSON.stringify(ticketjson);
            fs.writeFileSync('files/ticket.json', data, (err) => {
                if (err) throw err;
            });
            interaction.deferUpdate()
        })
    },


    async save(interaction, client) {
        let user = interaction.user

        var searchField = "idChannel";
        var searchVal = interaction.message.channel.id;
        var id;
        for (var i = 0; i < ticketjson.Tickets.length; i++) {
          if (ticketjson.Tickets[i][searchField] == searchVal) {
            id = i;
          }
        }
        if (interaction.message.id != ticketjson.Tickets[id].idMsgClose) {
          return;
        }

        
        let message = interaction.message;
        let messageCollection = new Discord.Collection();
        let channelMessages = await message.channel.messages.fetch({
            limit: 100
        }).catch(err => console.log(err));

        messageCollection = messageCollection.concat(channelMessages);

        while (channelMessages.size === 100) {
            let lastMessageId = channelMessages.lastKey();
            channelMessages = await interaction.message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
            if (channelMessages)
                messageCollection = messageCollection.concat(channelMessages);
        }
        let msgs = Array.from(messageCollection).reverse()
        let data = await fs2.readFile('template.html', 'UTF-8').catch(err => console.log(err));
        if (data) {
            await fs2.writeFile('./Tanscript-save-ticket/' + ticketjson.Tickets[id].id + '_' + interaction.message.channel.name + '.html', data).catch(err => console.log(err));
            let guildElement = document.createElement('div');
            let guildText = document.createTextNode(" " + interaction.message.guild.name + " -> " + ticketjson.Tickets[id].id + "_" + interaction.message.channel.name);
            let guildImg = document.createElement('img');
            guildImg.setAttribute('src', interaction.message.guild.iconURL({ size: 512, dynamic: true, format: 'png' }));
            guildImg.setAttribute('width', '150');
            guildElement.appendChild(guildImg);
            guildElement.appendChild(guildText);
            await fs2.appendFile('./Tanscript-save-ticket/' + ticketjson.Tickets[id].id + '_' + interaction.message.channel.name + '.html', guildElement.outerHTML).catch(err => console.log(err));

            msgs.forEach(async msg => {
                let parentContainer = document.createElement("div");
                parentContainer.className = "parent-container";

                let avatarDiv = document.createElement("div");
                avatarDiv.className = "avatar-container";
                let img = document.createElement('img');
                img.setAttribute('src', msg[1].author.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }));
                img.className = "avatar";
                avatarDiv.appendChild(img);

                parentContainer.appendChild(avatarDiv);

                let messageContainer = document.createElement('div');
                messageContainer.className = "message-container";

                let nameElement = document.createElement("span");
                let name = document.createTextNode(msg[1].author.tag + " " + msg[1].createdAt.toDateString() + " " + msg[1].createdAt.toLocaleTimeString());
                nameElement.appendChild(name);
                messageContainer.append(nameElement);

                if (msg[1].content.startsWith("```")) {
                    let m = msg[1].content.replace(/```/g, "");
                    let codeNode = document.createElement("code");
                    let textNode = document.createTextNode(m);
                    codeNode.appendChild(textNode);
                    messageContainer.appendChild(codeNode);
                }
                else {
                    if (msg[1].embeds[0] != null) {
                        let msgNode = document.createElement('span');
                        let textNode = document.createTextNode("EMBED: " + msg[1].embeds[0].title);
                        msgNode.append(textNode);
                        messageContainer.appendChild(msgNode);

                    } else {
                        let msgNode = document.createElement('span');
                        let textNode = document.createTextNode(msg[1].content);
                        msgNode.append(textNode);
                        messageContainer.appendChild(msgNode);
                    }
                }
                parentContainer.appendChild(messageContainer);
                await fs2.appendFile('./Tanscript-save-ticket/' + ticketjson.Tickets[id].id + '_' + interaction.message.channel.name + '.html', parentContainer.outerHTML).catch(err => console.log(err));

            });
            client.channels.fetch(config.ChanId.LogsTicket)
                .then(channel => {
                    channel.send({ files: ['./Tanscript-save-ticket/' + ticketjson.Tickets[id].id + '_' + interaction.message.channel.name + '.html'] });
                })
            TicketLogs(interaction.message.channel.name, "Ticket enregistré", ticketjson.Tickets[id].category, ticketjson.Tickets[id].id, user, "#20a7f4", client)

            interaction.message.channel.send("Ticket enregistrer dans <#" + config.ChanId.LogsTicket + ">")
            interaction.deferUpdate()
        }
    },



    async delete(interaction, client) {
        let user = interaction.user
        
      var searchField = "idChannel";
      var searchVal = interaction.message.channel.id;
      var id;
      for (var i = 0; i < ticketjson.Tickets.length; i++) {
        if (ticketjson.Tickets[i][searchField] == searchVal) {
          id = i;
        }
      }
      if (interaction.message.id != ticketjson.Tickets[id].idMsgClose) {
        return;
      }

      //Déstruction du ticket
      TicketLogs(interaction.message.channel.name, "Ticket fermé", ticketjson.Tickets[id].category, ticketjson.Tickets[id].id, user, "#bb0000", client)
      ticketjson.Tickets.splice(id, 1);
      let data = JSON.stringify(ticketjson);
      fs.writeFileSync('files/ticket.json', data, (err) => {
        if (err) throw err;
      });
      interaction.message.channel.delete()
    }


}