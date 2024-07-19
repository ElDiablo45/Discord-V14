const { SlashCommandBuilder } = require('discord.js')
const { PermissionFlagsBits } = require('discord.js')
const config = require('../../config');
const allowedGuildId = config.developerGuildID;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Habla el bot por ti')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName('mensaje').setDescription('el mensaje dice el bot').setRequired(true)),
    async execute(interaction) {

        if (interaction.guild.id !== allowedGuildId) {
            await interaction.reply({ content: "Este comando no esta activado en este servidor", ephemeral: true});
            // Si no es el servidor correcto, no ejecuta el comando
            return;
        }
        
            const mensaje = interaction.options.getString('mensaje');

            const channel = interaction.channel;
            
            interaction.reply({ content: `Mensaje enviado`, ephemeral: true });
            channel.send({ content: `${mensaje}`})
        },
};