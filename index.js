const Discord = require('discord.js');
const moment = require("moment")
const fs = require("fs");

require("moment-duration-format")

const token = process.env.token
const prefix = process.env.prefix

const bot = new Discord.Client();

  bot.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.id == "557950194948505601") {
      if (message.content === "dungeon") {
        if (message.member.roles.has("551768116065992714")) {

            message.channel.send("你已經輸入過了").then(message => message.delete(5000))

            const already = new Discord.RichEmbed()
              .setTitle("無法驗證(重複驗證)")
              .setDescription("===================**《※ 輸入者資訊 ※》**===================")
              .setColor(0xFCFF00)
              .addField(":level_slider: 輸入者ID",`\`\`\`fix\n${message.author.id}\`\`\``, true)
              .addField(":bust_in_silhouette: 輸入者",`\`\`\`fix\n${message.author.username}\`\`\``, true)
              .setTimestamp(new Date())

            bot.channels.filter(c => c.name === "驗證log頻道").forEach(c => c.send(already));


            const success1 = new Discord.RichEmbed()
              .setTitle("無法驗證(重複驗證)")
              .setDescription("你已經驗證過了! 請勿重複驗證")
              .setColor(0xFCFF00)

            message.member.sendMessage(success1)

            message.delete()

        } else {
          message.member.addRole("551768116065992714").then(message.channel.send("已成功驗證").then(message => message.delete(5000)))

          const success = new Discord.RichEmbed()
            .setTitle("驗證成功")
            .setDescription("===================**《※ 輸入者資訊 ※》**===================")
            .setColor(0x18FF00)
            .addField(":level_slider: 輸入者ID",`\`\`\`fix\n${message.author.id}\`\`\``, true)
            .addField(":bust_in_silhouette: 輸入者",`\`\`\`fix\n${message.author.username}\`\`\``, true)
            .setTimestamp(new Date())

          bot.channels.filter(c => c.name === "驗證log頻道").forEach(c => c.send(success));


          const success1 = new Discord.RichEmbed()
            .setTitle("驗證成功")
            .setDescription("恭喜你驗證成功了!")
            .setColor(0x18FF00)

          message.member.sendMessage(success1)


          message.delete()
        }
      } else {

        message.channel.send("請輸入\"dungeon\"").then(message => message.delete(5000));

        const other = new Discord.RichEmbed()
          .setTitle("驗證失敗(輸入非dungeon字詞)")
          .setDescription("===================**《※ 輸入者資訊 ※》**===================")
          .setColor(0xFF0000)
          .addField(":level_slider: 輸入者ID",`\`\`\`fix\n${message.author.id}\`\`\``, true)
          .addField(":bust_in_silhouette: 輸入者",`\`\`\`fix\n${message.author.username}\`\`\``, true)
          .addField(":keyboard: 輸入文字",`\`\`\`${message.author.lastMessage}\`\`\``, true)
          .setTimestamp(new Date())

        bot.channels.filter(c => c.name === "驗證log頻道").forEach(c => c.send(other));


        const other1 = new Discord.RichEmbed()
          .setTitle("驗證失敗(輸入非dungeon字詞)")
          .setDescription("相關資訊")
          .setColor(0xFF0000)
          .addField(":keyboard: 輸入文字",`\`\`\`${message.author.lastMessage}\`\`\``, true)

        message.member.sendMessage(other1)

        message.delete()
        }
      }
    })
    

    bot.on("message", async message => {
      //command handler
      if (message.author.bot || message.channel.type === 'dm') return;
      if (message.content.toLowerCase().indexOf(prefix) !== 0) return
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
      try{
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(bot, message, args);
      }catch(err){
        message.reply(`未知指令! 請輸入 **${prefix}help** 查看指令列表`)
      }
      if(message.content.indexOf(prefix) !== 0) return;
    
    })

    bot.on("ready", async () => {
      fs.readdir("./commands/", (err,files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
          console.log("找不到任何指令");
          return;
        }
      
        jsfile.forEach((f, i) => {;
          console.log(`${f} 載入成功!`)
        })
      })
    })
    
  
  

  bot.on("guildCreate", guild => {
    console.log(`加入群組 ${guild.name} [ ${guild.memberCount} ](id: ${guild.id})`);
  });
  
  bot.on("guildDelete", guild => {
    console.log(`退出群組 ${guild.name} [ ${guild.memberCount} ] (id: ${guild.id})`);
  });
  
  bot.on("ready", () => {
    console.log(`${bot.user.username}成功啟動了!^w^ [ ${bot.guilds.size} | ${bot.channels.size} | ${bot.users.size} ]`);
    bot.user.setActivity(`我正在 ${bot.guilds.size} 個群組潛水`,'https://www.twitch.tv/weikuouo');
  });
  
bot.login(token);
  