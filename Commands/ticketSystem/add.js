const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const config = require('../../config');
const allowedGuildId = config.developerGuildID;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("agregar a un usuario o rol del ticket")
        .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers)
        .addUserOption((input) =>
            input.setName("user").setDescription("El usuario a agregar").setRequired(false))
        .addRoleOption((input) =>
            input.setName("role").setDescription("El rol a agregar").setRequired(false)),
    async execute(interaction, client) {

        if (interaction.guild.id !== allowedGuildId) {
            await interaction.reply({ content: "Este comando no esta activado en este servidor", ephemeral: true});
            // Si no es el servidor correcto, no ejecuta el comando
            return;
        }

        const user = interaction.options.getUser("user");
        const role = interaction.options.getRole("role");

        if (user) {
            await interaction.channel.permissionOverwrites
                .edit(user, {
                    SendMessages: true,
                    AddReactions: true,
                    ReadMessageHistory: true,
                    AttachFiles: true,
                    ViewChannel: true,
                })
                .catch((e) => console.log(e));

            interaction
                .reply({ content: `> Has agregado a <@${user.id}> al ticket` })
                .catch((e) => console.log(e));
        } else if (role) {
            await interaction.channel.permissionOverwrites
                .edit(role, {
                    SendMessages: true,
                    AddReactions: true,
                    ReadMessageHistory: true,
                    AttachFiles: true,
                    ViewChannel: true,
                })
                .catch((e) => console.log(e));

            interaction
                .reply({ content: `> Has agregado el rol <@&${role.id}> al ticket` })
                .catch((e) => console.log(e));
        } else {
            interaction
                .reply({ content: `> No se proporcionó un usuario ni un rol para eliminar` })
                .catch((e) => console.log(e));
        }
    },
};