const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'ban',
    description: 'Bans A User (until unbanned).', 
    permissions: 'BAN_MEMBERS',
    permissionError: 'You Dont Have Perms To Ban Someone',
    expectedArgs: '$ban @User',

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('You Need To Mention A Member To Ban.')
        member.ban()

        const embed = new MessageEmbed()
        .setTitle('User Banned')
        .setDescription(`<@${member.user.id}> Has Been Banned.`)
        .addField('Banned By', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}