const { REST, Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');
const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID
const token = process.env.TOKEN
const dotenv = require('dotenv');


const rest = new REST({ version: '10' }).setToken(token);

// ...

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);