module.exports = {
	async execute(client) {

		client.on("inviteDelete", async invite => {
			await client.invites.delete(invite.code);
		})
		
	},
};