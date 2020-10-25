const mongo = require('../../../db/db')
const langSchema = require('../../../db/schemas/language-schema')
const { languages } = require('../../languages/languages.json')
const { setLanguage } = require('../../languages/languages')

module.exports = {
    run: async(client, message, args) => {

      const { guild } = message

      const targetLanguage = args.toLowerCase()
      if (!languages.includes(targetLanguage)) {
        message.reply(`A linguagem " ${targetLanguage} " não é suportada`)
        return
      }

      
      setLanguage(guild, targetLanguage)
      if(message.member.hasPermission('ADMINISTRATOR')) {
        await mongo.then(async (mongoose) => {
          try {
            message.reply(`A linguagem do servidor foi definida para: ${targetLanguage}`)
            message.channel.send(`The language has been changed to: ${targetLanguage}`)
            await langSchema.findOneAndUpdate(
              {
                _id: guild.id,
              },
              {
                _id: guild.id,
                language: targetLanguage,
              },
              {
                upsert: true,
              }
            )
          
          } catch(err) {
            console.log(err)
          }
        })
      }else return message.reply('Você não tem permissão para isso!\nYou do not have permission to do this!')
    }, aliases: ['setl'], description: 'Linguagens'
}