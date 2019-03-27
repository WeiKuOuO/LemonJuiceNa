const { RichEmbed } = require('discord.js');

module.exports.run = (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('抱歉,你沒有**管理員權限**來使用這個指令').then(message => message.delete(5000));
    if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send('我沒有**管理員權限**來刪除訊息').then(message => message.delete(5000));

    let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);

    if (!role) role = message.member.highestRole;

    const embed = new RichEmbed()
        .setColor(role.hexColor)
        .setTitle(`身分組 | ${role.name}`)
        .addField('使用人數', role.members.size, true)
        .addField('顏色(16進位)', role.hexColor, true)
        .addField('創建日期', role.createdAt.toDateString(), true)
        .addField('ID', role.id, true);
    return message.channel.send({
        embed: embed
    });
};