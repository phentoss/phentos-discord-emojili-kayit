const Discord = require('discord.js');
const rdb = require('quick.db');
const moment = require('moment');

exports.run = async (client, message, args) => {
let tag = 'TAGINIZ' //İsmin önüne gelecek simge,tag   
let ikinciTag = 'İKİNCİTAGINIZ'
if(!["yetkiliid"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`).then(x => x.delete({timeout: 5000}));

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
  if (!isim) return message.channel.send('Bir isim yazmalısın.').then(x => x.delete({timeout: 5000}));
  if (!yaş) return message.channel.send('Bir yaş yazmalısın.').then(x => x.delete({timeout: 5000}));
  if (isNaN(yaş)) return message.channel.send('Yaş sadece sayı olarak kabul edilir.').then(x => x.delete({timeout: 5000}));
let gün = moment(message.createdAt).format("DD.");
let yıl = moment(message.createdAt).format("YYYY HH:mm:ss");
let ay = moment(message.createdAt).format("MM.")
.replace("Ocak").replace("Şubat")
.replace("Mart").replace("Nisan")
.replace("Mayıs").replace("Haziran")
.replace("Temmuz").replace("Ağustos")
.replace("Eylül").replace("Ekim")
.replace("Kasım").replace("Aralık");
  let kayıtlımı = await rdb.fetch(`kayıtkişi_${member}`)
  let eskikayıt = await rdb.fetch(`kayıtisim_${member}`)
  let toplamisim = `${gün}${ay}${yıl} tarihin de <@${message.author.id}> tarafından \`${tag} ${isim} | ${yaş}\` **(Yeni İsim)** olarak isim değişikliği yapılmış.`
  let Isim = `${member.user.username.includes(tag) ? tag : (ikinciTag ? ikinciTag : (tag || ""))} ${isim} | ${yaş}`
  member.setNickname(Isim)
  if(kayıtlımı !== 'evet') {
  rdb.set(`kayıtkişi_${member}`, 'evet')
  rdb.set(`kayıtisim_${member}`, toplamisim)
  rdb.push(`eskikayıt_${member.id}`, toplamisim)
  rdb.add(`toplamik_${member.id}`, 1)
  let embed = new Discord.MessageEmbed()
  .setColor('f5f5f5')
  .setDescription(`${member} kişisinin ismi "${tag} ${isim} | ${yaş}" olarak değiştirildi! `)
  .setTimestamp()
   message.react(client.emojiler.onay).catch();
message.channel.send(embed).then(x => x.delete({timeout: 15000}));
  } 
  if(kayıtlımı === 'evet') {
  rdb.set(`kayıtisim_${member}`, toplamisim)
  rdb.push(`eskikayıt_${member.id}`, toplamisim)
  rdb.add(`toplamik_${member.id}`, 1)
    let embed = new Discord.MessageEmbed()
  .setDescription(`<a:ret:780217763708534785> <@${message.author.id}> üzgünüm bu kişinin ismini "${tag} ${isim} | ${yaş}" olarak değiştirdim fakat veritabanın da kayıtlar buldum.

${toplamisim}

\`.isimler ${member.id}\` komutuyla üyenin geçmiş isimlerine bakmanız tavsiye edilir.`)
  .setTimestamp()
  .setColor('f5f5f5')
message.react(client.emojiler.ret).catch();
message.channel.send(embed).then(x => x.delete({timeout: 25000}));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['isim'],
  permLevel: 0
}
exports.help = {
  name: 'isim',
  description: "Kullanıcıların isimini değiştiren sistem",
  usage: 'isim @kişi isim yaş'
}