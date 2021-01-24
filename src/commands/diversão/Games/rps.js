module.exports = {
    run :async(client, message) => {
        const languages = require('../../../util/languages/languages')
        const { guild } = message
        var rps = [`${languages(guild, 'RPS_P')}`, `${languages(guild, 'RPS_P2')}`, `${languages(guild, 'RPS_T')}`];
        var rpsChoice = rps[Math.floor(Math.random() * rps.length)];

        message.reply(`${languages(guild, 'RPS_C')}`).then(() => {
            message.channel.awaitMessages(response => response.content === `${languages(guild, 'RPS_P')}` || response.content === `${languages(guild, 'RPS_P2')}` || response.content === `${languages(guild, 'RPS_T')}`,  {
                max: 1,
                time: 10000,
                errors: ['time'],
            }).then((collected) => {
                let response = collected.first().content.toLowerCase();
                if (response === `${languages(guild, 'RPS_P')}` && rpsChoice == `${languages(guild, 'RPS_T')}`) {
                    message.reply(`${languages(guild, 'RPS_A')}`);
                    message.channel.send(process.env.ANGWY);
                    message.channel.send(`${languages(guild, 'RPS_G')} ${rpsChoice} ${languages(guild, 'RPS_G2')} ${response}`);
                } else if (response === `${languages(guild, 'RPS_P2')}` && rpsChoice == `${languages(guild, 'RPS_P')}`) {
                    message.reply(`${languages(guild, 'RPS_A1')}`);
                    message.channel.send(process.env.OHNO);
                    message.channel.send(`${languages(guild, 'RPS_G')} ${rpsChoice} ${languages(guild, 'RPS_G2')} ${response}`);
                } else if (response === `${languages(guild, 'RPS_T')}` && rpsChoice == `${languages(guild, 'RPS_P2')}`) {
                    message.reply(`${languages(guild, 'RPS_A2')}`);
                    message.channel.send(process.env.POUT);
                    message.channel.send(`${languages(guild, 'RPS_G')} ${rpsChoice} ${languages(guild, 'RPS_G2')} ${response}`);
                } else if (response  === rpsChoice) {
                    message.reply(`${languages(guild, 'RPS_A3')}`);
                    message.channel.send(process.env.SHRUG)
                    message.channel.send(`${languages(guild, 'RPS_G')} ${rpsChoice} ${languages(guild, 'RPS_G2')} ${response}`);
                } else {
                    message.reply(`${languages(guild, 'RPS_A4')}`);
                    message.channel.send(process.env.SMUG) 
                    message.channel.send(`${languages(guild, 'RPS_G')} ${rpsChoice} ${languages(guild, 'RPS_G2')} ${response}`)
                }
            }).catch(() => {
                message.reply(`${languages(guild, 'RPS_ERR')}`);
            
            });
        });


    },
    aliases: ['joken', 'jokenpo'],
    description: "Pedra, papel ou tesoura!"
}

require('dotenv').config()