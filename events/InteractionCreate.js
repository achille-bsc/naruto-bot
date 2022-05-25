const Discord = require('discord.js')
const config = require('../config.json')
const ticketManager = require('../models/ticketManager')
const helpManager = require('../models/helpManager')
const autoroleManager = require("../models/autoroleManager.js");
const autorole = require("../files/autorole.json")

module.exports = {
    async execute(client) {

        client.on("interactionCreate", async (interaction) => {
            //          Help Command

            if (interaction.customId == "HelpSelect") {
                helpManager.interaction(interaction, client)
            }

            //          Help Command
            //--------------------------------------
            //          tickets

            if (interaction.message.id == ticketjson.msgDefault) {
                ticketManager.create(interaction, client)
            }

            // Button CLOSE
            if (interaction.message.channel.parent.id == config.CatId.Tickets && interaction.customId == "Close") {
                ticketManager.confClose(interaction)
            }

            // Button Cancel
            if (interaction.message.channel.parent.id == config.CatId.Tickets && interaction.customId == "Cancel") {
                interaction.message.delete()
            }

            // Button Confirm
            if (interaction.message.channel.parent.id == config.CatId.Tickets && interaction.customId == "Confirm") {
                ticketManager.close(interaction, client)
            }

            // Button Save
            if (interaction.message.channel.parent.id == config.CatId.Tickets && interaction.customId == "Save") {
                ticketManager.save(interaction, client)
            }

            // Button Delete
            if (interaction.message.channel.parent.id == config.CatId.Tickets && interaction.customId == "Delete") {
                ticketManager.delete(interaction, client)
            }



            //          tickets
            //--------------------------------------
            //          Auto Roles

            if (interaction.message.id == autorole.msg) {
                autoroleManager.onInteract(interaction)
            }
        })
    }
}