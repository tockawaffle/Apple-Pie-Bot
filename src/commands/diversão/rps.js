module.exports = {
    run :async(client, message) => {

        var rps = ["pedra", "papel", "tesoura"];
        var rpsChoice = rps[Math.floor(Math.random() * rps.length)];
        
        message.reply("Então você quer me desafiar para o famoso Jokenpô? Ha! Mal sabe você que eu sou profissional nesse jogo!\nMas já que é o caso, faça sua escolha: Pedra, Papel ou Tesoura?").then(() => {
            message.channel.awaitMessages(response => response.content === "pedra" || response.content === "papel" || response.content === "tesoura",  {
                max: 1,
                time: 10000,
                errors: ['time'],
            }).then((collected) => {
                let response = collected.first().content.toLowerCase();
                if (response === "pedra" && rpsChoice == "tesoura") {
                    message.reply("Tsc... Quem diria que pedra quebra ferro.");
                    message.channel.send(process.env.ANGWY);
                    message.channel.send(`Eu escolhi ${rpsChoice} e você escolheu ${response}`);
                } else if (response === "papel" && rpsChoice == "pedra") {
                    message.reply("Droga! Só porquê eu achei que você escolheria tesoura");
                    message.channel.send(process.env.OHNO);
                    message.channel.send(`Eu escolhi ${rpsChoice} e você escolheu ${response}`);
                } else if (response === "tesoura" && rpsChoice == "papel") {
                    message.reply("Dessa vez eu perdi, mas juro na próxima ganhar!...");
                    message.channel.send(process.env.POUT);
                    message.channel.send(`Eu escolhi ${rpsChoice} e você ${response}...`);
                } else if (response  === rpsChoice) {
                    message.reply("Hmm, parece que empatou -Ufa-, quer tentar novamente?");
                    message.channel.send(process.env.SHRUG)
                    message.channel.send(`Eu escolhi ${rpsChoice} e você escolheu ${response}`);
                } else {
                    message.reply("Haha! Você perdeu, eu saí vitoriosa! Hoje terá torta na janta heh");
                    message.channel.send(process.env.SMUG) 
                    message.channel.send(`Eu escolhi ${rpsChoice} e você escolheu ${response}`)
                }
            }).catch(() => {
                message.reply("Você não deu um resposta válida, injusto!\n||Meu criador não quer que você saiba, mas, se você escrever a primeira letra maiúscula, eu não consigo ler o que você escreveu..||");
            
            });
        });


    },
    aliases: ['joken', 'jokenpo'],
    description: "Pedra, papel ou tesoura!"
}

require('dotenv').config()