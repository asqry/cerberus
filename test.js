const Discord = require('discord.js')

const Test = require('./models/guild.js')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/config', { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = {
    name: 'test',
    description: "test to see if the DB is working properly",
    usage: '[arg]',
    category: "Miscellaneous",
    execute(bot, message, args){
        if(message.author.bot) return;

        if(!args[0]){
        let testarg = args.join(" ")

        let vartest = true

        const filter = m => m.author.id === message.author.id;
        message.reply("what do you want your prefix to be?")
        message.channel.awaitMessages(filter, {max: 2}).then(collected => {
            if(collected.first().content === "cancel"){
                message.reply('cancelled')

                return;
            }

            let embed = new Discord.RichEmbed()
            .addField("Testing:", collected.first().content)

            message.channel.send(embed)

            const newTest = new Test({
                guildID: message.guild.id,
                prefix: collected.first().content
            })

            newTest.save()

            

        }).catch(err => {

            message.reply("Time ran out")

        })
    }
    },
}