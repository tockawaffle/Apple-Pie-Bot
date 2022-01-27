async function filterChamps(input) {
    const champList = ["Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe",,"Azir","Bard","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia",,"Corki","Darius","Diana","Draven",,"Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna",,"Jax","Jayce","Jhin","Jinx",,"Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen",,"Kindred","Kled",,,"Lee Sin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","Master Yi","Miss Fortune","Wukong","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Neeko","Nidalee","Nocturne",,"Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","Rell","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Seraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra",,"Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere",,"Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Xayah","Xerath","XinZhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Ziggs","Zilean","Zoe","Zyra", "Seraphine"]
    const inputChamp = input.join().charAt(0).toUpperCase() + input.join(' ').slice(1)
    if (champList.includes(inputChamp)) {
        return inputChamp
    } else {
        const otherChamps = [{name: "Velkoz", id: "Velkoz"}, {name: "Vel'Koz", id: "Velkoz"}, {name: "Reksai", id: "RekSai"}, {name: "Rek'Sai", id: "RekSai"}, {name: "Khazix", id: "Khazix"}, {name: "Kha'Zix", id: "Khazix"}, {name: "Kogmaw", id: "KogMaw"}, {name: "Kog'Maw", id: "KogMaw"}, {name: "Aurelion sol", id: "AurelionSol"}, {name: "Aurelion Sol", id: "AurelionSol"}, {name: "Jarvan", id: "JarvanIV"}, {name: "Jarvan IV", id: "JarvanIV"}, {name: "Leblanc", id: "Leblanc"}, {name: "Lb", id: "Leblanc"}, {name: "LeBlanc", id: "Leblanc"}, {name: "Tk", id: "TahmKench"},{name: "Tahm kench", id: "TahmKench"}, {name: "Tahm Kench", id: "TahmKench"}, {name: "Nunu", id: "Nunu"}, {name: "Nunu & Willump", id: "Nunu"}, {name: "Tf", id: "TwistedFate"}, {name: "Twisted Fate", id: "TwistedFate"}]
        const otherChampsList = otherChamps.map(champ => champ.name)
        if (otherChampsList.includes(inputChamp)) {
            const result = otherChamps.find(champ => champ.name === inputChamp).id
            return result
        } else {
            return null
        }
    }
}

module.exports = {filterChamps}