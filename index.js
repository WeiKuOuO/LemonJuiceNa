const Discord = require('discord.js');

const token = process.env.token

const bot = new Discord.Client();

  bot.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.id == "557950194948505601") {
      if (message.content === "dungeon") {
        if (message.member.roles.has("551768116065992714")) {
            message.channel.send("你已經輸入過了").then(message => message.delete(5000))
            const already = new Discord.RichEmbed()
              .setTitle("無法驗證(重複驗證)")
              .setDescription("==============**《※ 輸入者資訊 ※》**==============")
              .setColor(0xFCFF00)
              .addField(":level_slider: 輸入者ID",`\`\`\`fix\n${message.author.id}\`\`\``, true)
              .addField(":bust_in_silhouette: 輸入者",`\`\`\`fix\n${message.member.nickname}\`\`\``, true)
              .setTimestamp(new Date())
            bot.channels.filter(c => c.name === "驗證log頻道").forEach(c => c.send(already));
            message.delete()
        } else {
            message.member.addRole("551768116065992714").then(message.channel.send("已成功驗證").then(message => message.delete(5000)))
            const success = new Discord.RichEmbed()
              .setTitle("驗證成功")
              .setDescription("==============**《※ 輸入者資訊 ※》**==============")
              .setColor(0x18FF00)
              .addField(":level_slider: 輸入者ID",`\`\`\`fix\n${message.author.id}\`\`\``, true)
              .addField(":bust_in_silhouette: 輸入者",`\`\`\`fix\n${message.member.nickname}\`\`\``, true)
              .setTimestamp(new Date())
            bot.channels.filter(c => c.name === "驗證log頻道").forEach(c => c.send(success));
            message.delete()
        }
      } else {
        message.channel.send("請輸入\"dungeon\"").then(message => message.delete(5000));
        const other = new Discord.RichEmbed()
          .setTitle("驗證失敗(輸入非dungeon字詞)")
          .setDescription("===================**《※ 輸入者資訊 ※》**===================")
          .setColor(0xFF0000)
          .addField(":level_slider: 輸入者ID",`\`\`\`fix\n${message.author.id}\`\`\``, true)
          .addField(":bust_in_silhouette: 輸入者",`\`\`\`fix\n${message.member.nickname}\`\`\``, true)
          .addField(":keyboard: 輸入文字",`\`\`\`${message.author.lastMessage}\`\`\``, true)
          .setTimestamp(new Date())
        bot.channels.filter(c => c.name === "驗證log頻道").forEach(c => c.send(other));
        message.delete()
      }
    }
    // if(message.content === "wtfisthewrongjoin"){
    //    message.delete().catch(O_o=>{});
    //    const joinmessage = new Discord.RichEmbed()
    //   .setAuthor(bot.user.username)
    //   .setTitle("加入須知")
    //   .setColor(0x00FF04)
    //   .addField("如何加入?","\`\`\`fix\n歡迎來到地城之內DC群，請打'dungeon'來證明你不是機器人\`\`\`", true)
    // bot.channels.filter(c => c.name=="歡迎來到地城之內").forEach(c => c.bulkDelete("50"))
    // bot.channels.filter(c => c.name === "歡迎來到地城之內").forEach(c => c.send(joinmessage));
    // }

  })
  

  bot.on("guildCreate", guild => {
    console.log(`加入群組 ${guild.name} [ ${guild.memberCount} ](id: ${guild.id})`);
  });
  
  bot.on("guildDelete", guild => {
    console.log(`退出群組 ${guild.name} [ ${guild.memberCount} ] (id: ${guild.id})`);
  });
  
  bot.on("ready", () => {
    console.log(`${bot.user.username}成功啟動了!^w^, [ ${bot.guilds.size} | ${bot.channels.size} | ${bot.users.size} ]`);
    bot.user.setActivity(`我正在 ${bot.guilds.size} 個群組潛水`,'https://www.twitch.tv/weikuouo');
  });
  
bot.login(token);
  