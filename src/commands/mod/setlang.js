const mongo = require('../../../db/db')
const langSchema = require('../../../db/schemas/language-schema')
const { languages } = require('../../util/languages/languages.json')
const { setLanguage } = require('../../util/languages/languages')
const { MessageEmbed } = require('discord.js')
const page = require('discord.js-pagination')

module.exports = {

  run: async(client, message, args) => {

    const { guild } = message
    const targetLanguage = args[0]

    if(!targetLanguage) {
      const noargs = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setColor("RED")
        .setDescription(`
          ❌Failed: Missing Args
          ❌Falha: Faltando Argumentos
        `)
        .addFields(
          {
            name: 'You can choose between those languages:',
            value: '```_setl english or portugues```'
          },
          {
            name: 'Você pode escolher entre esses idiomas:',
            value: "```_setl portugues ou english```"
          }
        )
      message.reply(noargs)
      return
    }

    if (!languages.includes(targetLanguage)) {
      const nolang = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setColor("RED")
        .setDescription(`
          The following language is not supported!:
          O idioma a seguir não é suportada!:
        `)
        .addFields(
          {
            name: 'Not Supported: || Não suportado:',
            value: `\`\`\`${targetLanguage}\`\`\``
          }
        )
      const langs = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setColor("RED")
        .setDescription(`
          These are the supported languages:
          Esses são os idiomas suportados:
        `)
        .addFields(
          {
            name: 'You can choose between those languages:',
            value: '```_setl english or portugues```'
          },
          {
            name: 'Você pode escolher entre esses idiomas:',
            value: "```_setl portugues ou english```"
          }
        )
      pages = [
        nolang,
        langs
      ]
      page(message, pages)
      return
    }
    
    
    setLanguage(guild, targetLanguage)
    if(message.member.hasPermission("MANAGE_GUILD")) {

        const sucess = new MessageEmbed()
          .setAuthor(guild.name, guild.iconURL({dynamic: true}))
          .setDescription(`
            The language has been set!
            O idioma foi configurada!
          `)
          .addFields(
            {
              name: 'New language: || Novo idioma:',
              value: `\`\`\`${targetLanguage}\`\`\``
            }
          )
          .setColor("RANDOM")
        message.reply(sucess)

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
        
    } else {
      const noPerm = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic:true}))
        .setDescription(`
          ❌Failed: Missing User Permission
          ❌Falha: Faltando Permissões de Usuário
        `)
        .addFields(
          {
            name: 'Necessary Permission: || Permissão necessária:',
            value: '```Manage Guild || Gerenciar Servidor```'
          }
        )
        .setColor("RED")
      message.reply(noPerm)
    }


    }, aliases: ['setl'], description: 'Linguagens'
}