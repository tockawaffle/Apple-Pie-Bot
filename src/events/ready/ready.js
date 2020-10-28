const { createStream } = require('table');
const tableConfig = require('../../util/tableConfig');
const { commandStatus, eventStatus } = require('../../util/registry');
    
    const database = require('../../../db/db')
    database.then(() => console.log(`Apple Pie se conectou ao MongoDB!`)).catch(err => console.log(err))
    const { loadLangs } = require('../../languages/languages')

module.exports = async (client) => {



    console.log(`${client.user.tag} Saiu do forno!`);
    await loadTable(commandStatus, 50);
    console.log("\n");
    await loadTable(eventStatus, 50);
    
    // client.user.setActivity('A stream de: https://www.twitch.tv/izgohi', {type: 'LISTENING'});
    client.user.setActivity(`Atualmente, ${client.guilds.cache.size} servidores me acolheram como bot!`, {type: 'PLAYING'});
    let activNum = 0;
    setInterval(function() {
        if(activNum === 0) {
            client.user.setActivity("O forno é uma ferramenta dificil de se usar, por isso nem todos conseguem!")
            activNum = 1;
        } else if (activNum === 1) {
            client.user.setActivity("Torta é crocante, torta é vida, se eu fosse uma torta você me comeria?")
            activNum = 2;
        } else if (activNum === 2) {
            client.user.setActivity("A vida é curta! Não deixe para amanhã a torta que você pode comer hoje.")
            activNum = 3;
        } else if (activNum === 3) {
            client.user.setActivity(`O nome do meu criador é Tocka Waifu!`)
            activNum = 0;
        }  
    }, 300 * 1000);

    loadLangs(client)
}

function loadTable(arr, interval) {
    let fn, i = 0, stream = createStream(tableConfig);
    return new Promise((resolve, reject) => {
        fn = setInterval(() => {
            if(i === arr.length)
            {
                clearInterval(fn);
                resolve();
            }
            else {
                stream.write(arr[i]);
                i++;
            }
        }, interval); 
    })
}
