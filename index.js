const Discord = require('discord.js');

const token = process.env.token

const bot = new Discord.Client();

  bot.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.id == "557950194948505601") {
      if (message.content === "dungeon") {
        if (message.member.roles.has("551768116065992714")) {
            message.channel.send("你已經輸入過了了").then(message => message.delete(5000))
            message.delete()
        } else {
            message.member.addRole('551768116065992714').then(message.channel.send("已成功驗證").then(message => message.delete(5000)))
            message.delete()
        }
      } else {
        message.channel.send("請輸入\"dungeon\"").then(message => message.delete(5000));
        message.delete()
      }
    }

    if(command === "join"){
       message.delete().catch(O_o=>{});
       const joinmessage = new Discord.RichEmbed()
      .setAuthor(bot.user.username)
      .setTitle("加入須知")
      .setColor(0x00FF04)
      .addField("如何加入?","\`\`\`fix\n歡迎來到地城之內DC群，請打'dungeon'來證明你不是機器人\`\`\`", true)
    bot.channels.filter(c => c.name=="歡迎來到地城之內").forEach(c => c.bulkDelete("50"))
    bot.channels.filter(c => c.name === "歡迎來到地城之內").forEach(c => c.send(joinmessage));
    }

  })
  

  bot.on("guildCreate", guild => {
    console.log(`加入群組 ${guild.name} [ ${guild.memberCount} ](id: ${guild.id})`);
  });
  
  bot.on("guildDelete", guild => {
    console.log(`退出群組 ${guild.name} [ ${guild.memberCount} ] (id: ${guild.id})`);
  });
  
  
bot.login(token);
  