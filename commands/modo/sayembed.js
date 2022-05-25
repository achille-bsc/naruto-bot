const Discord = require("discord.js");
const config = require('../../config')

module.exports = {
    name: "sayembed",
    description: "Commande pour envoyer un embed sous forme de json",
    command: config.PREFIX+"sayembed",

    execute(message, arg, client) {

        let args = arg.splice(0).join(" ");

        if(args == "") {
            message.channel.send("Merci de spécifier votre json pour crée votre embed.\nVoici un wiki pour crée votre json https://discordjs.guide/popular-topics/embeds.html#using-an-embed-object ")
            return
        }

        const json = args.split(" ").splice(0).join(" ")

        try{

            message.channel.send({embeds: [new Discord.MessageEmbed(JSON.parse(json))]});
        
        } catch (err) {

            console.log(message.author.username+" à essayer de crée un embed, voici l'erreur:")
            const attachment = new Discord.MessageAttachment(Buffer.from(String(err)), 'err.txt')
            message.channel.send({content: "Argument invorrect. Vous avez fait une erreur dans votre json:", files: [attachment]})
        
        }

        message.delete()

    }
}