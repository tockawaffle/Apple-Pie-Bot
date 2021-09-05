const slap = [
    'https://i.pinimg.com/originals/b6/d8/a8/b6d8a83eb652a30b95e87cf96a21e007.gif',
    'https://i.pinimg.com/originals/07/b4/51/07b4516d50406b4a320269d514876170.gif',
    'https://i.pinimg.com/originals/93/28/74/9328743378801a4c048e43526decfc0e.gif',
    'https://i.pinimg.com/originals/70/0b/b2/700bb2cc9429e2bab1da767b4486f4e1.gif',
    'https://i.pinimg.com/originals/6a/01/9d/6a019dee74f0ef1ed8315db7dba972f7.gif',
    'https://i.pinimg.com/originals/1c/f8/4b/1cf84bf514d2abd2810588caf7d9fd08.gif',
]

function selectRandomImage() {
    return slap[Math.floor(Math.random() * slap.length)]
}

module.exports = {selectRandomImage}