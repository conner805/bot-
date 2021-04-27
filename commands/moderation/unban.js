const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['unban'],
    description: 'Unbans A User Using Its ID to get the id go into server settings go to bans right click on the person to unban a click on copy ID and use the command with the ID',
    permissions: 'BAN_MEMBERS',
    permissionError: 'You Dont Have Perms To Unban Someone',
    expectedArgs: '$unban User-ID',

    callback: (message, args) => {

        const userID = args[0]
        if(!userID) return message.reply('You Need To Unban Using User\'s ID.')

       
        message.guild.fetchBans().then(bans => {
            if(bans.size == 0) return
            let bannedUser = bans.find(b => b.user.id == userID)

            if(bannedUser) {

                const embed =  new MessageEmbed()
                .setTitle('User Unbanned')
                .setDescription(`<@${userID}> Has been Unbanned`)
                .addField('Unbanned By:-', message.author)
                .addField('User ID:-', userID)
                .setColor('RANDOM')

                message.channel.send(embed).then(message.guild.members.unban(bannedUser.user))
            } else {
                message.reply('Invalid Banned User ID.')
            }
        })


    }
}