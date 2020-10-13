const { createStream } = require('table');
const tableConfig = require('../../util/tableConfig');
const { commandStatus, eventStatus } = require('../../util/registry');

module.exports = async (client) => {

    console.log(`${client.user.tag} has logged in.`);
    await loadTable(commandStatus, 50);
    console.log("\n");
    await loadTable(eventStatus, 50);

    let activNum = 0;
    setInterval(function() {
        if(activNum === 0) {
            client.user.setActivity(`Atualmente, ${client.guilds.cache.size} servidores me acolheram como bot!`, {type: 'PLAYING'});
            activNum = 1;
        } else if (activNum === 1) {
            client.user.setActivity("Torta é crocante, torta é vida, se eu fosse uma torta vc me comeria?")
            activNum = 0;
        // } else if (activNum === 2) {
        //     client.user.setActivity("")
        //     activNum = 3;
        // } else if (activNum === 3) {
        //     client.user.setActivity('')
        //     activNum = 0;
        }  
    }, 300 * 1000);
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
