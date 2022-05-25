module.exports = {
	async execute(client) {

		client.on("inviteCreate", async invite => {
			await client.invites.set(invite.code, { uses: invite.uses, inviter: invite.inviterId });
		})

	}
};