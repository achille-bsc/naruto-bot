const { MessageEmbed, MessageActionRow, MessageButton, InteractionCollector, ReactionUserManager, Message } = require('discord.js')
const config = require("../../config.json")
const sondage = require("../../files/sondages.json")
const fs = require('fs')
const wait = require("timers/promises").setTimeout;
const ms = require("ms")

json = {
	"title": null,
	"time": null,
	"responses": [],
	"msgId": null,
	"channelId": null,
}

module.exports = {

	name: "sondage",
	description: "Permet de créer un sondage",
	command: config.PREFIX + "sondage",

	async execute(message, args, client) {

		try {
			message.delete();

			const reply1 = new MessageEmbed()
				.setTitle("Sondages")
				.setDescription(`Quelle option voullez-vous choisir ?`)
				.addField('`create`', 'Créer un sondage')
				.addField('`end`', 'Permet de finir un sondage')
				.setFooter(config.FootersEmbed)
				.setColor(config.ColorEmbeds.sondages)
				;
			const replied1 = await message.channel.send({ embeds: [reply1] });
			const filter = m => m.content.includes('create') || m.content.includes('end');

			const collector1 = message.channel.createMessageCollector({ filter, time: 60_000 });

			collector1.on('collect', async m => {

				collector1.stop();

				if (m.content === 'create') {
					await replied1.delete();
					await m.delete();

					const sondageMessage = new MessageEmbed()
						.setTitle('⚙️ Nouveau Sondage (En cour de configuration) ⚙️')
						.setFooter(config.FootersEmbed)
						.setColor(config.ColorEmbeds.sondages)
						;


					const row = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId('addquestion')
								.setLabel('Quesion')
								.setStyle('SUCCESS'),
						)
						.addComponents(
							new MessageButton()
								.setCustomId('time')
								.setLabel('Temps de fin du sondage')
								.setStyle('PRIMARY')
								.setDisabled(true),
						)
						.addComponents(
							new MessageButton()
								.setCustomId('channel')
								.setLabel('Salon')
								.setStyle('PRIMARY')
								.setDisabled(true),
						)
						.addComponents(
							new MessageButton()
								.setCustomId('addoption')
								.setLabel('Ajouter un Option')
								.setStyle('PRIMARY')
								.setDisabled(true),
						)
						.addComponents(
							new MessageButton()
								.setCustomId('end')
								.setLabel('Finaliser la configuration')
								.setStyle('SECONDARY')
								.setDisabled(true),
						)
						;
					const cancelComponent = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId('cancel')
								.setLabel('Annuler')
								.setStyle('DANGER')
										,
						)
						;

					const SondageMessageSend = await message.channel.send({ embeds: [sondageMessage], components: [row, cancelComponent] });
					let optionsCounter = 0;
					let emojiList = [];
					let sendChannel = null

					const filter = (interaction) => interaction.user.id === message.author.id;
					const collector2 = SondageMessageSend.createMessageComponentCollector({ componentType: 'BUTTON', time: 10 * 60 * 1000, filter });

					collector2.on('collect', async i => {

						if (i.user.id === message.author.id && i.message.id === SondageMessageSend.id) {

							row.components[0].setDisabled(true);
							row.components[1].setDisabled(true);
							row.components[2].setDisabled(true);
							row.components[3].setDisabled(true);

							SondageMessageSend.edit({ components: [row, cancelComponent] });

							if (i.customId === 'addquestion') {

								const reply = new MessageEmbed()
									.setTitle('Nouvelle Question')
									.setDescription('Quelle est la question ?')
									.setFooter(config.FootersEmbed)
									.setColor(config.ColorEmbeds.sondages)
									;

								i.reply({ embeds: [reply] });

								const filterAddQuestion = (msg) => msg.author.id === message.author.id;
								const collector = message.channel.createMessageCollector({ time: 120_000, filterAddQuestion });

								collector.on('collect', async m => {

									if (m.author.bot) return;

									m.delete();
									i.deleteReply();

									if (m.content.length > 0) {

										sondageMessage.addField(m.content, '\u200B');
										row.components[0].setDisabled(true);
										row.components[1].setDisabled(false);

										json.title = m.content;

										SondageMessageSend.edit({ embeds: [sondageMessage], components: [row, cancelComponent] });
										collector.stop();
									}

								});
							}

							if (i.customId === 'addoption') {

								const filterAddOption = (interaction) => interaction.user.id === message.author.id;

								const reply = new MessageEmbed()
									.setTitle('Nouvelle Option')
									.setDescription('Quelle est l\'option ?')
									.addField('Format', '`<emoji>`++`<option>`')
									.setFooter(config.FootersEmbed)
									.setColor(config.ColorEmbeds.sondages)
									;

								i.reply({ embeds: [reply] });

								const collector = message.channel.createMessageCollector({ time: 120_000, filterAddOption });

								collector.on('collect', m => {

									if (m.author.bot) return;
									m.delete();
									i.deleteReply();

									if (m.content.length > 0 && m.content.includes('++')) {

										const emoji = m.content.split('++')[0].replace(' ', '')
										emojiList.push(`${emoji}`);

										proposition = {
											"emoji": emoji,
											"option": m.content.split('++')[1]
										}
										json.responses.push(proposition);

										const option = m.content.split('++')[1];
										sondageMessage.addField(`${emoji}`, `${option}`, true);
										optionsCounter++;

										if (optionsCounter >= 2) {
											row.components[4].setDisabled(false);
										}

										row.components[3].setDisabled(false);
										SondageMessageSend.edit({ embeds: [sondageMessage], components: [row, cancelComponent] });

									} else {

										message.channel.send('Format incorrect');
										row.components[3].setDisabled(false);
										SondageMessageSend.edit({ components: [row, cancelComponent] });

									}
									collector.stop();
								});
							}

							if (i.customId === 'channel') {

								const filterAddOption = (interaction) => interaction.user.id === message.author.id;

								const reply = new MessageEmbed()
									.setTitle('Channel')
									.setDescription('Veuillez donner un salon dans le quelle vous souhaitez envoyer le sondage')
									.setFooter(config.FootersEmbed)
									.setColor(config.ColorEmbeds.sondages)
									;

								i.reply({ embeds: [reply] });

								const collector = message.channel.createMessageCollector({ time: 120_000, filterAddOption });

								collector.on('collect', m => {

									if (m.author.bot) return;
									m.delete();
									i.deleteReply();

									if (m.content.length === 21 && m.content.startsWith('<#') && m.content.endsWith('>')) {

										idchan = m.content.replace(/</g, '')
										idchan = idchan.replace(/>/g, '')
										idchan = idchan.replace(/#/g, '')

										const channel = m.guild.channels.cache.get(idchan)

										if (!channel) {

											const error = new MessageEmbed()
												.setTitle('Salon Introuvable !')
												.setColor('RED')
												.setFooter(config.FootersEmbed)
												;

											m.channel.send({ embeds: [error] }).then((msg) => {
												setTimeout(() => {
													msg.delete();
												}, 5000);
											})

										} else {

											sondageMessage.addField(`Salon d'envoit =>`, `<#${channel.id}>`);
											row.components[0].setDisabled(true);
											row.components[1].setDisabled(true);
											row.components[3].setDisabled(false);
											SondageMessageSend.edit({ embeds: [sondageMessage], components: [row, cancelComponent] });
											sendChannel = channel

										}

									} else {

										message.channel.send('Format incorrect');
										row.components[2].setDisabled(false);
										SondageMessageSend.edit({ components: [row, cancelComponent] });
										SondageMessageSend.edit({ components: [row, cancelComponent] });
									}
									collector.stop();
								});
							}

							if (i.customId === 'time') {

								const filterAddOption = (interaction) => interaction.user.id === message.author.id;

								const reply = new MessageEmbed()
									.setTitle('Temps de fin')
									.setDescription('Veuillez donner la date à la quelle le sondage devra se terminer avec la syntaxe suivante : `20d5h3min2s`')
									.setFooter(config.FootersEmbed)
									.setColor(config.ColorEmbeds.sondages)
									;

								i.reply({ embeds: [reply] });

								const collector = message.channel.createMessageCollector({ time: 120_000, filterAddOption });

								collector.on('collect', m => {
									if (m.author.bot) return;
									if (!m.content.includes('d') && !m.content.includes('h') && !m.content.includes('m') && !m.content.includes('s')) {
										m.delete();
										collector.stop();
										i.deleteReply()
										const errEmbed = new MessageEmbed()
											.setTitle('Format incorrect')
											.setDescription('Vous devez respecter le format indiqué !')
											.setColor('RED')
											.setFooter(config.FootersEmbed)
											;

										m.channel.send({ embeds: [errEmbed] }).then((msg) => {
											setTimeout(() => {
												msg.delete();
											}
												, 5000);
										})

									}

									const time = new Date()
									time.setMilliseconds(time.getMilliseconds() + ms(m.content));
									json.time = time.getTime();


									m.delete();
									i.deleteReply();



									sondageMessage.addField(`Date de fin`, `${time.toLocaleString()}`);

									row.components[1].setDisabled(true);
									row.components[2].setDisabled(false);

									SondageMessageSend.edit({ embeds: [sondageMessage], components: [row, cancelComponent] });

									collector.stop();
								});
							}

							if (i.customId === 'end') {

								await i.reply({ content: `Le sondage à correctement été envoyé dans le salon <#${sendChannel.id}>`, ephemeral: true })

								await SondageMessageSend.delete();

								var searchField = "name";
								var searchVal = "Salon d'envoit =>";
								var rechercherm;

								for (var i = 0; i < sondageMessage.fields.length; i++) {
									if (sondageMessage.fields[i][searchField] == searchVal) {
										rechercherm = i;
									}
								}

								sondageMessage.fields.splice(rechercherm, 1);
								const finalEmbed = sondageMessage.setTitle('📊 Nouveau Sondage !')

								const final = await sendChannel.send({ content:`<@${config.autoRole.Sondages}>`, embeds: [finalEmbed] })

								json.channelId = sendChannel.id;
								json.messageId = final.id;
								sondage.sondages.push(json)

								let data = JSON.stringify(sondage);
								fs.writeFileSync('files/sondages.json', data, (err) => {
									if (err) throw err;
								});

								emojiList.forEach(emoji => {
									final.react(emoji)
								});

							} 
							if (i.customId === 'cancel') {
								try {
									await SondageMessageSend.delete();
									i.channel.send({ content: `Sondage annulé`, ephemeral: false })
									collector2.stop();
								} catch (error) {
									i.channel.send({ content: `Sondage annulé`, ephemeral: false })
									collector2.stop();
								}


							}
						} else {
							i.reply({ content: `Vous ne pouvez pas interagir avec ce message`, ephemeral: true });
						}
					});
				}

				if (m.content === 'end') {
					collector1.stop();
					replied1.delete();

					const message = new MessageEmbed()
						.setTitle('Message du sondage')
						.setDescription(`Veuillez entrer l'id le message à envoyer`)
						.addField('`cancel`', 'annuler')
						.setColor('GREEN')
					;

					const reply2 = await m.channel.send({ embeds: [message] });


					const collector2 = reply2.channel.createMessageCollector({ time: 60000 });

					collector2.on('collect', async m => {

						if (m.content === 'cancel') {
							collector2.stop();
							reply2.delete();

							const canceled = new MessageEmbed()
								.setTitle('Commande Annulée')
								.setColor('YELLOW')
								;

							await m.channel.send({ embeds: [canceled] }).then(msg => {

								setTimeout(() => {
									msg.delete();
								}, 5000);
								;
							}).catch(err => null)
							return
						}

						reply2.delete();

						var searchField = "messageId";
						var searchVal = m.content;
						var rechercherm = null;

						for (var i = 0; i < sondage.sondages.length; i++) {
							if (sondage.sondages[i][searchField] == searchVal) {
								rechercherm = i;
							}
						}
						if (rechercherm == null) {
							m.reply("Erreur, ce sondage n'existe pas.")
						} else {

							sondage.sondages[rechercherm].time = 0
							let data = JSON.stringify(sondage);
							fs.writeFileSync('files/sondages.json', data, (err) => {
								if (err) throw err;
							});
							m.reply("Le sondage à bien été fini.")

						}
						collector2.stop();




					})


				}



			});
		} catch (error) {
			try {

				const ErrEmbed = new MessageEmbed()
					.setTitle('Une erreur est survenue')
					.setDescription(`Une erreur est survenue. Veuillez réessayer d\'éxécuter la commande ultérieurement.\nSi le problème persiste, veuillez contacter les dévelopeurs du bot.\nVoici  l'erreur:\`\`\`${error}\`\`\``)
					.setFooter(config.FootersEmbed)
					.setTimestamp()
					.setColor('RED')
				;

				message.channel.send({ embeds: [ErrEmbed] })
			} catch (error) {
				console.error(err)
				return;
			}
		}

	}
}