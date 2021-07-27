const { MessageEmbed } = require("discord.js"); const {default: fetch} = require("node-fetch"); const lang = require("../../../../util/languages/languages")
const guildSchema = require('../../../../configs/db/schemas/guildSchema'); const pages = require('discord.js-pagination')

module.exports = {
    description: "", aliases: ["chinfo", "champ", "cinfo"],
    run: async(client, message, args) => {
        
        try {
            const {guild, author: {id: authorId}} = message
            const inputChamp = args.join().charAt(0).toUpperCase() + args.join(' ').slice(1)
            const champList = ["Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","Aurelion Sol","Azir","Bard","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","Cho'Gath","Corki","Darius","Diana","Draven","Dr. Mundo","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","Jarvan IV","Jax","Jayce","Jhin","Jinx","Kai'Sa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Kha'Zix","Kindred","Kled","Kog'Maw","LeBlanc","Lee Sin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","Master Yi","Miss Fortune","Wukong","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Neeko","Nidalee","Nocturne","Nunu & Willump","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","Rek'Sai","Rell","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Seraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","Tahm Kench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","Twisted Fate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Vel'Koz","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Xayah","Xerath","XinZhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Ziggs","Zilean","Zoe","Zyra", "Kai'sa"]
            if(champList.indexOf(inputChamp) !== -1) {
                let champName;
                if(inputChamp === "Kai'Sa") champName = "Kaisa"; if(inputChamp === "Dr. Mundo") champName = "DrMundo"; if(inputChamp === "Cho'Gath") champName = "Chogath"; 
                if(inputChamp === "Vel'Koz") champName= "Velkoz"; if(inputChamp === "Rek'Sai") champName = "RekSai"; if(inputChamp === "Kha'Zix") champName = "Khazix";
                if(inputChamp === "Kog'Maw") champName = "KogMaw"; if(inputChamp === "Aurelion Sol") champName = "AurelionSol"; if(inputChamp === "Jarvan IV") champName = "JarvanIV";
                if(inputChamp === "LeBlanc") champName = "Leblanc"; if(inputChamp === "Tahm Kench") champName = "TahmKench"; if(inputChamp === "Nunu & Willump") champName = "Nunu";
                if(inputChamp === "Twisted Fate") champName = "TwistedFate"
                const guildLang = await guildSchema.findOne({_id: guild.id}); let lang;
                if(guildLang.language === "portugues") lang = "pt_BR"
                else if(guildLang.language === "english") lang = "en_US"
                const req = await fetch(`https://ddragon.leagueoflegends.com/cdn/11.15.1/data/${lang}/champion/${champName||inputChamp}.json`)
                const reqJson = await req.json()
                if(champName) {
                    const data = reqJson.data[champName]
                    const champPresentationEmbed = new MessageEmbed()
                        .setTitle(`${data.name} | ${data.title}`)
                        .setDescription(`Lore:\n\`\`\`${data.lore}\`\`\`\nAlly Tips:\n\`\`\`${data.allytips.join("\n\n")}\`\`\`\nEnemy Tips:\`\`\`\n${data.enemytips.join("\n\n")}\`\`\``)
                        .setColor("RANDOM")
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    const champStats = new MessageEmbed()
                        .setTitle(`${data.name} | ${data.title}`)
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RANDOM")
                        .setDescription(`**Stats:**\n\`\`\`HP: ${data.stats.hp} | ${data.stats.hpperlevel}^¹\nHP Regen.: ${data.stats.hpregen} | ${data.stats.hpregenperlevel}^¹\nMP: ${data.stats.mp} | ${data.stats.mpperlevel}^¹\nMP Regen.: ${data.stats.mpregen} | ${data.stats.mpregenperlevel}^¹\nMovespeed: ${data.stats.movespeed}\nArmor: ${data.stats.armor} | ${data.stats.armorperlevel}^¹\nMR: ${data.stats.spellblock} | ${data.stats.spellblockperlevel}^¹\nAA Dmg: ${data.stats.attackdamage} | ${data.stats.attackdamageperlevel}^¹\`\`\``)
                    const champHab = new MessageEmbed()
                        .setTitle(`${data.name} | ${data.title}`)
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RANDOM")
                        
                    return pages(message, [champPresentationEmbed, champStats])
                } else {
                    const data = reqJson.data[inputChamp]
                    const champPresentationEmbed = new MessageEmbed()
                        .setTitle(`${data.name} | ${data.title}`)
                        .setDescription(`Lore:\n\`\`\`${data.lore}\`\`\`\nAlly Tips:\n\`\`\`${data.allytips.join("\n\n")}\`\`\`\nEnemy Tips:\`\`\`\n${data.enemytips.join("\n\n")}\`\`\``)
                        .setColor("RANDOM")
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    const champStats = new MessageEmbed()
                        .setTitle(`${data.name} | ${data.title}`)
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RANDOM")
                        .setDescription(`**Stats:**\n\`\`\`HP: ${data.stats.hp} | ${data.stats.hpperlevel}^¹\nHP Regen.: ${data.stats.hpregen} | ${data.stats.hpregenperlevel}^¹\nMP: ${data.stats.mp} | ${data.stats.mpperlevel}^¹\nMP Regen.: ${data.stats.mpregen} | ${data.stats.mpregenperlevel}^¹\nMovespeed: ${data.stats.movespeed}\nArmor: ${data.stats.armor} | ${data.stats.armorperlevel}^¹\nMR: ${data.stats.spellblock} | ${data.stats.spellblockperlevel}^¹\nAA Dmg: ${data.stats.attackdamage} | ${data.stats.attackdamageperlevel}^¹\`\`\``)
                    return pages(message, [champPresentationEmbed, champStats])
                    } 
            } else {
                const champListErr = new MessageEmbed()
                    .setTitle(lang(guild, "M_E"))
                    .setColor("RANDOM")
                    .setDescription(`Please, use one of the following, as it is:\n\`\`\`${champList.join(", ")}\`\`\``)
                return message.reply(champListErr)
            }   
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(message.author.username, message.author.displayAvatarURL({dynamyc: true}))
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff\n +Error: ${error}\`\`\`\nIf this error persists, please, open an issue at my GitHub page.`) 
            message.reply(errorEmbed)
            message.channel.stopTyping()
        }
    }
}