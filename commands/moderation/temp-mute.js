const { MessageEmbed, User } = require('discord.js')
const ms = require('ms')

module.exports = {
    commands: ['tempmute', 'tempm'],
    description: 'Temp Mutes A User only for admins.',
    permissions: 'ADMINISTRATOR',
    permissionError: 'You Dont Have Perms To Mute Someone',
    expectedArgs: '$tempmute @User',

    callback: async(message, args) => {
        const member = message.mentions.members.first()
        member.roles.add('801728021438005288')
        const time = args[1]
        if(!member) return message.reply('Mention A User to Temp Mute.')
        if(!time) return message.reply('Specify A Time To Mute')

        if(member.roles.cache.has('801728021438005288')) return message.reply('User Is Already Muted.')
        await member.roles.add('801728021438005288')

        const embed = new MessageEmbed()
        .setTitle('User temp Muted')
        .setDescription(`<@${member.user.id}> Is Temp Muted For ${time}.`)
        .addField('Muted By', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)

        
        setTimeout(async () => {
            await member.roles.remove('801728021438005288')
            message.channel.send(`<@${member.user.id}> Is Unmuted After ${time} Of Mute.`)
        }, ms(time))
    } 
}