const pats = [
    "https://i.pinimg.com/originals/73/b2/7f/73b27f56e37fb332a884f7ea1f8fbc0c.gif",
    'https://i.pinimg.com/originals/48/97/73/4897734e420880998b7047a2432684e5.gif',
    'https://i.pinimg.com/originals/7a/ac/01/7aac01fe264581179622ef6df4a08d45.gif',
    'https://i.pinimg.com/originals/38/db/ba/38dbba01df34822bfe0a286e861d9b3a.gif',
    'https://i.pinimg.com/originals/75/9a/3e/759a3e4200a0f4c292ebf3fd84cf25e1.gif',
    'https://i.pinimg.com/originals/48/d6/75/48d67569d3dd681bc5b638b4783ee13e.gif'
]

function selectRandomImage() {
    return pats[Math.floor(Math.random() * pats.length)]
}

module.exports = {selectRandomImage}