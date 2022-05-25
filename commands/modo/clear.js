const Discord = require('discord.js')
const config = require("../../config.json")
const wait = require("timers/promises").setTimeout;

module.exports = {
    name: "clear",
    description: "Supprimé X messages d'un channel",
    command: config.PREFIX + "clear <Number-messages>",

    async execute(message, args, client) {
        message.delete();
        const args2 = message.content.split(' ').slice(1);
        const amount = args2.splice(0).join(" ");

        if (!amount) return message.channel.send('Vous n\'avez pas mentionné de nombre pour supprimer les messages.');
        if (isNaN(amount)) return message.channel.send('Le paramètre ajouté n\'est pas un nombre.');
        if (amount > 100) return message.channel.send('Tu ne peux pas supprimer + de 100 messages à la fois !');
        if (amount < 1) return message.channel.send('Vous devez supprimer au moins 1 message.');

        message.channel.messages.fetch({ limit: amount }).then(messages => {

            message.channel.bulkDelete(messages, true).then((msgs) => {
                message.channel.send(`\`${msgs.size}\` messages ont été supprimés.`).then(async msg => {
                    await wait(5000)
                    msg.delete()
                })
            })
            
        });
    }
}