const mongo = require('../../../db/db')
const langSchema = require('../../../db/schemas/language-schema')
const { languages } = require('../../util/languages/languages.json')
const { setLanguage } = require('../../util/languages/languages')

module.exports = {

  run: async(client, message, args) => {
    const { guild } = message

    const targetLanguage = args[0]
    if (!languages.includes(targetLanguage)) {
      message.reply(`\nThe language " ${targetLanguage} " is not supported!\nA linguagem " ${targetLanguage} " não é suportada!`)
      return
    }
    
    
    setLanguage(guild, targetLanguage)
    if(message.member.hasPermission("ADMINISTRATOR")) {
      await mongo.then(async (mongoose) => {
        message.reply(`The language has been set to: ${targetLanguage}\nA linguagem do servidor mudou para: ${targetLanguage}`)
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
      })
    } else return message.reply('Você não tem permissão para isso!\nYou do not have permission to do this!');


    }, aliases: ['setl'], description: 'Linguagens'
}