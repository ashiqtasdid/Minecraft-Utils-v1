// SERVER
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//BOT CODE
const fs = require('node:fs');

const dotenv = require('dotenv');

dotenv.config();
const path = require('node:path');

const { Collection } = require('discord.js')

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.TOKEN

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// TOP. GG
const { AutoPoster } = require('topgg-autoposter')

const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgxMDE5MjkzNjQ3MjkzNjQ4MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjc0NDk3NDQzfQ.KicQ-rzmMKwbp8iRaZc4sTDzzS_C3_rIXHpDUFIzpsA', client)

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})


// Log in to Discord with your client's token
client.login(token);

//auto kill
const ms = require("ms");
setInterval(() => {
  if (!client || !client.user) {
    console.log("Client didn't Login, Process Kill")
    process.kill(1);
  }
}, ms("1m"));