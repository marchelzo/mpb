const ytdl = require('ytdl-core');
const Discord = require("discord.js");

const token = process.env['TOKEN'];
const client = new Discord.Client();

client.on('debug', console.error);
client.on('error', console.error);

client.on('ready', () => {
	const guild = client.guilds.first();
	const channel = guild.channels.find('type', 'voice');
	channel.join().then(connection => {
		connection.on('debug', console.error);
		connection.on('error', console.error);
		connection.player.on('error', console.error);
		connection.player.on('debug', console.error);
		let stream = ytdl('https://www.youtube.com/watch?v=KAZdkLqrGZA', {quality: 'lowest', filter: 'audioonly'});
		const dispatcher = connection.playStream(stream, {seek: 0, volume: 0.08});
		dispatcher.on('end', () => console.log('stream ended!'))
		dispatcher.on('debug', console.error);
		dispatcher.on('error', console.error);
	}).catch(console.error);
});

const commands = {
	'quit': () => {
		console.log('Quitting!');
		client.destroy();
	},
};

client.on('message', msg => {
	if (msg.content[0] === '!') {
		console.log(`command = ${command}`);
		let command = commands[msg.content.substr(1)];
		if (command)
			command();
	}
});

client.login(token);
