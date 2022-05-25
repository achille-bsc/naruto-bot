const Discord = require('discord.js')
const config = require('../config.json')
const banFile = require('../files/tempBan.json')
const fs = require('fs')
const sondage = require("../files/sondages.json")
const Chart = require('chart.js');
const Canvas = require('canvas')
const ChartDataLabels = require('chartjs-plugin-datalabels')

module.exports = {
    async start(guild) {
        setInterval(async () => {

            // stats
            let chanMembers = guild.channels.cache.get(config.Stats.Members.ChanId)
            let chanBoosts = guild.channels.cache.get(config.Stats.Boosts.ChanId)
            let chanMembersIg = guild.channels.cache.get(config.Stats.MembersIg.ChanId)

            chanMembers.setName(config.Stats.Members.name.replace("{x}", guild.memberCount.toLocaleString()))
            chanBoosts.setName(config.Stats.Boosts.name.replace("{x}", (guild.premiumSubscriptionCount == 0) ? "0" : guild.premiumSubscriptionCount))
            chanMembersIg.setName(config.Stats.MembersIg.name.replace("{x}", "0"))
            let date = new Date()

            // bans
            for (let i = 0; i < banFile.length; i++) {

                if (banFile[i].timestamp <= date.getTime()) {

                    guild.bans.remove(banFile[i].id)
                    banFile.splice(i, 1)
                    let data = JSON.stringify(banFile);
                    fs.writeFileSync('files/tempBan.json', data, (err) => {
                        if (err) throw err;
                    });
                }
            }


            // sondages
            for (let i = 0; i < sondage.sondages.length; i++) {

                if (sondage.sondages[i].time <= date.getTime()) {
                    const chan = guild.channels.cache.get(sondage.sondages[i].channelId)

                    let labels = []
                    let datas = []

                    const plugin = {
                        id: 'custom_canvas_background_color',
                        beforeDraw: (chart) => {
                            const ctx = chart.canvas.getContext('2d');
                            ctx.save();
                            ctx.globalCompositeOperation = 'destination-over';
                            ctx.fillStyle = '#8acfd4';
                            ctx.fillRect(0, 0, chart.width, chart.height);
                            ctx.restore();
                        }
                    };
                    await chan.messages.fetch(sondage.sondages[i].messageId).then(async msg => {
                        sondage.sondages[i].responses.forEach(async r => {
                            labels.push(r.option + " -> " + r.emoji)
                            datas.push(msg.reactions.cache.get(r.emoji).count - 1)
                        })
                        const canvas = Canvas.createCanvas(800, 500);
                        Chart.defaults.font.size = 32;
                        const myChart = await new Chart(canvas, {
                            type: 'doughnut',
                            data: {
                                labels: labels,
                                datasets: [{
                                    label: sondage.sondages[i].title,
                                    data: datas,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 255, 255, 1)'
                                    ],
                                    borderWidth: 2
                                }]
                            },
                            options: {
                                tooltips: {
                                    enabled: false
                                },
                                plugins: {
                                    datalabels: {
                                        formatter: (value, ctx) => {
                                            let datasets = ctx.chart.data.datasets;
                                            if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                                                let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                                                let percentage = Math.round((value / sum) * 100) + '%';
                                                return percentage;
                                            } else {
                                                return percentage;
                                            }
                                        },
                                        backgroundColor: '#ccc',
                                        borderRadius: 3,
                                        font: {
                                            color: 'red',
                                            weight: 'bold',
                                        }
                                    },

                                    title: {
                                        display: true,
                                        text: sondage.sondages[i].title
                                    }
                                }
                            },
                            plugins: [plugin, ChartDataLabels],
                        });
                        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "result.jpg")
                        let embed = new Discord.MessageEmbed()
                            .setTitle("Sondage fini")
                            .setColor(config.ColorEmbeds.sondages)
                            .setTimestamp()
                            .setFooter(config.FootersEmbed)
                            .setImage("attachment://result.jpg")
                            ;

                        let last = 0
                        await msg.reactions.cache.forEach(react => {
                            if (last < react.count) {
                                last = react.count - 1
                            }
                        })

                        let emojiWin = []
                        await msg.reactions.cache.forEach(react => {
                            if (react.count - 1 == last) {
                                emojiWin.push(react.emoji.name)
                            }
                        })
                        await sondage.sondages[i].responses.forEach(r => {

                            if (emojiWin.length == 1) {
                                if (emojiWin[0] == r.emoji)
                                    embed.setDescription("La réponse `" + r.option + "` est majoritaire au sondage avec `" + last + "` réactions")
                            } else {
                                if (emojiWin.includes(r.emoji)) {
                                    embed.setDescription("Plusieurs réponses sont arrivées à égalitées avec " + last + " reactions: ")
                                    embed.addField(r.option, r.emoji, true)
                                }
                            }

                        })

                        await msg.edit({
                            embeds: [embed
                            ], files: [attachment], content: null
                        })
                        await msg.reactions.removeAll()
                    })


                    sondage.sondages.splice(i, 1)
                    let data = JSON.stringify(sondage);
                    fs.writeFileSync('files/sondages.json', data, (err) => {
                        if (err) throw err;
                    });
                }
            }

        }, 2000)
    }

}
