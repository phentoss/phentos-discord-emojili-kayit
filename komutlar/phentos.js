const Discord = require("discord.js"),
client = new Discord.Client();

exports.run = async (client, message, args) => {
message.channel.send('Selam Dostum Bu Bir Taslak | Phentos#4545')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'phentos'
}