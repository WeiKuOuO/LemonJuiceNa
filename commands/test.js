const Discord = require('discord.js');
const moment = require("moment")
require("moment-duration-format")

exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
            .setColor('#36393e')
            .setThumbnail(message.guild.member.displayAvatarURL())
            .setAuthor(`${message.guild.member.username}#${message.guild.member.discriminator}`, user.displayAvatarURL())
            .addField("ID:", `${message.guild.member.id}`, true)
            .addField("Nickname:", `${message.guild.member.nickname || 'None'}`, true)
            .addField("Created At" + ` (${moment(message.guild.member.createdAt, "dd").fromNow()})`, `${moment.utc(message.guild.member.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, false)
            .addField("Joined Server" + ` (${moment(message.guild.member.joinedAt, "dd").fromNow()})`, `${moment.utc(message.guild.member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, false)
            .addField("Highest Role", message.guild.member.highestRole, true)
            .addField("Roles:", message.guild.member.roles.map(roles => `${roles.name}`).join(', '), true)
            .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
    message.channel.send(embed);
    
}