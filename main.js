const Discord = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const { GatewayIntentBits, Partials, ContextMenuCommandBuilder, ApplicationCommandType, REST, Routes , AttachmentBuilder, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ModalBuilder ,ButtonStyle, PermissionFlagsBits, ChannelType} = require('discord.js');
const client = new Discord.Client({intents: 3276799});
const config = require('./config');
const { mongoose } = require('mongoose');
const fs = require('fs');
const path = require('path');
const { connect } = require('mongoose');
const { resolveImage } = require('canvas');
const cron = require("node-cron");
const Canvas = require('canvas')
const voucher_codes = require("voucher-code-generator");
const User = require('./Schemas/user');
const { ActivityType } = require('discord.js');
const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');
require('@colors/colors');
const { joinVoiceChannel } = require('@discordjs/voice');
client.commands = new Discord.Collection();
client.buttons = new Discord.Collection();
client.selectMenus = new Discord.Collection();
client.modals = new Discord.Collection();
client.config = require('./config');
client
  .login(config.token)
  .then(() => {
    console.clear();
    console.log('[Discord API] '.green + client.user.username + ' is been logged.');
    
    mongoose.set('strictQuery', true);
    connect(config.database, {
    }).then(() => {
    console.log('[MongoDB API] '.green + 'is now connected.')
    loadEvents(client);
    loadCommands(client);
    });
    
    })
  .catch((err) => console.log(err));



