const Discord = require('discord.js');
const rdb = require('quick.db');
const moment = require('moment');
exports.run = async (client, message, args) => {
let kayıtsızRole = 'kayıtsızid' 
let erkekRole = 'erkekrolid'
let erkekRole2 = 'erkekdol2id'
let kızRole = 'kızrolid'
let kızRole2 = 'kızrol2id'

if(!["kayıtyetkiliid"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`).then(x => x.delete({timeout: 5000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(message.member.roles.highest.position <= member.roles.highest.position) {
    let yüksekte = new Discord.MessageEmbed()
    .setDescription(`Bu kişiye kayıtsız veremiyorum çünkü yetkisi benden üstte.`)
    .setTimestamp()
    .setColor('RANDOM');
    message.react(client.emojiler.ret).catch();
    return message.channel.send(yüksekte).then(x => x.delete({timeout: 5000}));
  }
  let tag = 'TAGINIZ' //İsmin önüne gelecek simge,tag   
  let ikinciTag = 'İKİNCİTAGINIZ'
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
  let Isim = `${member.user.username.includes(tag) ? tag : (ikinciTag ? ikinciTag : (tag || ""))} ${isim} | ${yaş}`
  await member.setNickname(Isim)
  await member.roles.set([kayıtsızRole])
  let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setFooter(`Developed By Phentos`)
  .setDescription(`${member} kişisi kayıtsıza atıldı.`)
  .setTimestamp()
message.react(client.emojiler.onay).catch();
message.channel.send(embed).then(x => x.delete({timeout: 15000}));
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kayıtsız'],
  permLevel: 0
}
exports.help = {
  name: 'kayıtsız',
  description: "Belirtilen üyeye kayıtsız rolü verir",
  usage: 'kayıtsız @kişi isim yaş'
}