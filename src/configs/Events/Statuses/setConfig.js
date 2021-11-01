async function setStatus(client) {
    statusArray = [
        "Rest easy. I’ll devour all your sins along with you.",
        "Descanse em paz. Eu irei devorar todos os seus pecados, junto de você.",
        "In this world, it’s eat or be eaten.",
        "Neste mundo, é devorar ou ser devorado.",
        "Once you give up, it’s all over. So you gotta do what you gotta do. Don’t get your hopes up!",
        "Assim que você desiste, está tudo acabado. Então você deve fazer o que você deve fazer. Não desista nunca!",
        "Nunca se esqueça de onde você veio, seja grato àqueles que te trouxeram onde você está agora, caso esteja em um lugar ruim, não deixe o ódio tomar conta.",
        "Se esquecer de onde você veio é o mesmo que não ter para onde ir.",
        "Seus amigos são mais importantes do que outras pessoas, não esqueça-os."
    ]

    const ms = require("ms")
    const random = statusArray[Math.floor(Math.random() * statusArray.length)];
    client.user.setActivity(random, {type: 'PLAYING'}); let actNum = 0
    setInterval(function() {
        if(actNum === 0) {const random2 = statusArray[Math.floor(Math.random() * statusArray.length)]; client.user.setActivity(random2, {type: 'PLAYING'}); actNum = 1}
        else if(actNum === 1) {const random3 = statusArray[Math.floor(Math.random() * statusArray.length)]; client.user.setActivity(random3, {type: 'PLAYING'}); actNum = 0}
    }, ms('1m'))
}

async function setAvatar(client) {
    const ms = require("ms")
    client.user.setAvatar('src/Configs/Events/imgs/perfil/i1.png').catch(err => console.log(`${err}`)); let av = 0
    setInterval(function() {
        if(av === 0) {client.user.setAvatar('src/Configs/Events/imgs/perfil/i2.jpg'); av = 1} 
        else if (av === 1) {client.user.setAvatar('src/Configs/Events/imgs/perfil/i3.jpg'); av = 2} 
        else if (av === 2 ) {client.user.setAvatar('src/Configs/Events/imgs/perfil/i4.jpg'); av = 3} 
        else if (av === 3) {client.user.setAvatar('src/Configs/Events/imgs/perfil/i5.jpg'); av = 4}
        else if (av === 4) {client.user.setAvatar('src/Configs/Events/imgs/perfil/i1.png'); av = 0} 
    }, ms('2h'));
}

module.exports = {setStatus, setAvatar}