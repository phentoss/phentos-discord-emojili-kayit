const Discord = require("discord.js");


module.exports.run = function(client, message, args) {
       let no = "no emojisi id"; let yes = "yes emojisi id";let n = no;let y = yes; 
	   let phentosSayılar = { 
     '0': `795219038736744458`,
      '1': `795218775363944459`,
      '2': `795218798042546187`,
      '3': `795218815654952971`,
      '4': `795218839264297041`,                  
      '5': `795218887661977600`,
      '6': `795218910441898004`,
      '7': `795218941449863220`,
      '8': `795218976849788978`,
      '9': `795218999876386826`,
}; 
let tag = "TAGINIZ"; 
let embed = new Discord.MessageEmbed().setFooter("Developed By Phentos.").setColor("RANDOM").setTimestamp();
 message.channel.send(embed.setDescription(`\`>\` Sunucumuzda toplam ${message.guild.memberCount.toString().split("").map(a => client.emojis.cache.get(phentosSayılar[a])).join("")} adet üye bulunmaktadır.\`>\` \n Sunucumuzun sesli odalarında ${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b).toString().split("").map(a => client.emojis.cache.get(phentosSayılar[a])).join("")} adet üye bulunmaktadır.\`>\` \n Sunucumuzun tagında ${message.guild.members.cache.filter(m => m.user.username.includes(tag)).size.toString().split("").map(a => client.emojis.cache.get(phentosSayılar[a])).join("")} adet üye bulunmaktadır.`))}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['say'],
  permLevel: 0
}
exports.help = {
  name: 'say',
  description: "Sunucu istatistiklerini sayar",
  usage: 'say'
}