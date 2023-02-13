const { REST, Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');
const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID
const token = process.env.TOKEN
const dotenv = require('dotenv');


const rest = new REST({ version: '10' }).setToken('ODEwMTkyOTM2NDcyOTM2NDgw.G4rpB3.bcuHO0LVEYXLelT6CEEvnC6FGAAHGB2TLRAiZc');

// ...

// for global commands
rest.put(Routes.applicationCommands('810192936472936480'), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);