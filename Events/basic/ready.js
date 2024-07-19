const { Events, EmbedBuilder } = require('discord.js');
const { mongoose } = require('mongoose');
const { config } = require('../../config')
const User = require('../../Schemas/user');
const cron = require("node-cron");

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute: async(client) => {
		mongoose.set('strictQuery', true);
		await mongoose.connect(config.database || '', {
			keepAlive: true,
		});

		if (mongoose.connect) {
			console.log(`\n`);
			console.log(` [ ✅ ] Connessione al database riuscita!`);
			return;
		}

		// cron.schedule("*/60 * * * * *", async () => {
        //     const users = await User.find({ isPremium: true });
    
        //     if (!users || !users.length) return;
    
        //     await users.forEach(async (user) => {
        //         if (Date.now() >= user.expiresAt) {
        //             user.isPremium = false;
        //             user.PremID = null;
        //             user.redeemedAt = null;
        //             user.expiresAt = null;
        //             user.plan = null;
        //             user.save();
        //             const embed = new EmbedBuilder()
        //             .setAuthor({ name: `Premium Subscription!`, iconURL: client.user.displayAvatarURL() })
        //             .setDescription(`Hey <@${user.Id}>. Your Premium subscription is over.`)
        //             .setColor('Red')
        //             .setTimestamp();
        //             client.users.fetch(user.Id).then((user) => {
        //                 user.send({embeds: [embed]});
        //                });
        //             console.log(`[PREMIUM SYSTEM DEBUG] Premium Expired for (${user.Id})`);
        //         }
        //     });
        // });
	},
};