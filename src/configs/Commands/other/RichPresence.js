async function RichPresence(author, userToGet) {
    if(!userToGet){
        throw new Error(`Nenhum usuário providenciado.`)
    }
    try {
        const activities = userToGet.presence.activities
        const moment = require("moment")
        const lang = require("@lang")
        let identifier; let response
        if(activities.length === 0) {
            return response = "Nothing."
        }
        if(activities.length > 1) {
            let Spotify; let VSC; let otherElements;
            identifier = {id: "Multiple"}
            activities.forEach(element => {
                if(element.name === "Spotify") {
                    const name = element.name ? element.name: lang(author, "not-provided")
                    const type = element.type ? element.type: lang(author, "not-provided")
                    const state = element.state ? element.state: lang(author, "not-provided")
                    const details = element.details ? element.details: lang(author, "not-provided")
                    const starts = moment(element.timestamps.start).fromNow()
                    const ends = moment(element.timestamps.end).fromNow()
                    const assets = {
                        largeText: element.assets.largeText ? element.assets.largeText : lang(author, "not-provided"),
                        smallText: element.assets.smallText ? element.assets.smallText: lang(author, "not-provided"),
                        largeImage: element.assets.largeImageURL() ? element.assets.largeImageURL(): "https://discord.com/assets/aef26397c9a6a3afee9c857c5e6f3317.svg",
                        smallImage: element.assets.smallImageURL() ? element.assets.smallImageURL(): "https://discord.com/assets/aef26397c9a6a3afee9c857c5e6f3317.svg"
                    }
                    return Spotify = {
                        name: name ? name: lang(author, "not-provided"),
                        type: type ? type: lang(author, "not-provided"),
                        state: state ? type: lang(author, "not-provided"),
                        details: details? details: lang(author, "not-provided"),
                        assets: assets ? assets: undefined,
                        starts: starts ? starts: lang(author, "not-provided"),
                        ends: ends ? ends: lang(author, "not-provided")
                    }
                } 
                if(element.name === "Visual Studio Code") {
                    const name = element.name ? element.name: lang(author, "not-provided")
                    const type = element.type ? element.type: lang(author, "not-provided")
                    const state = element.state ? element.state: lang(author, "not-provided")
                    const details = element.details ? element.details: lang(author, "not-provided")
                    const starts = moment(element.timestamps.start).fromNow()
                    const assets = {
                        largeText: element.assets.largeText ? element.assets.largeText : lang(author, "not-provided"),
                        smallText: element.assets.smallText ? element.assets.smallText: lang(author, "not-provided"),
                        largeImage: element.assets.largeImageURL() ? element.assets.largeImageURL(): "https://discord.com/assets/aef26397c9a6a3afee9c857c5e6f3317.svg",
                        smallImage: element.assets.smallImageURL() ? element.assets.smallImageURL(): "https://discord.com/assets/aef26397c9a6a3afee9c857c5e6f3317.svg"
                    }

                    return VSC ={
                        name: name ? name: lang(author, "not-provided"),
                        type: type ? type: lang(author, "not-provided"),
                        state: state ? type: lang(author, "not-provided"),
                        details: details? details: lang(author, "not-provided"),
                        assets: assets ? assets: undefined,
                        starts: starts ? starts: lang(author, "not-provided"),
                    }
                }else {
                    const name = element.name
                    const type = element.type
                    const state = element.state
                    const details = element.details
                    let starts; let assets;
                    if(element.timestamps) starts = moment(element.timestamps.start).fromNow()
                    if(element.assets) {
                        assets = {
                            largeText: element.assets.largeText ? element.assets.largeText : lang(author, "not-provided"),
                            smallText: element.assets.smallText ? element.assets.smallText: lang(author, "not-provided"),
                            largeImage: element.assets.largeImageURL() ? element.assets.largeImageURL(): "https://discord.com/assets/aef26397c9a6a3afee9c857c5e6f3317.svg",
                            smallImage: element.assets.smallImageURL() ? element.assets.smallImageURL(): "https://discord.com/assets/aef26397c9a6a3afee9c857c5e6f3317.svg"
                        }
                    }
                    return otherElements = {
                        name: name ? name: lang(author, "not-provided"),
                        type: type ? type: lang(author, "not-provided"),
                        state: state ? type: lang(author, "not-provided"),
                        details: details? details: lang(author, "not-provided"),
                        assets: assets ? assets: undefined,
                        starts: starts ? starts: lang(author, "not-provided"),
                    }
                    
                }
            });
            return [{"VSC": VSC, "Spotify": Spotify, "otherElements": otherElements, "id": identifier}]
        } else {
            let act; identifier = {"id": "Single"}
            const name = activities[0].name
            const type = activities[0].type
            const state = activities[0].state
            const details = activities[0].details
            let starts; let assets
            if(activities[0].timestamps) {
                starts = moment(activities[0].timestamps.start).fromNow()
            }
            if(activities[0].assets) {
                assets = {
                    largeText: activities[0].assets.largeText ? activities[0].assets.largeText : lang(author, "not-provided"),
                    smallText: activities[0].assets.smallText ? activities[0].assets.smallText: lang(author, "not-provided"),
                    largeImage: activities[0].assets.largeImageURL() ? activities[0].assets.largeImageURL(): "https://discord.com/assets/aef26397c9a6a3afee9c857c5e6f3317.svg",
                    smallImage: activities[0].assets.smallImageURL() ? activities[0].assets.smallImageURL(): "https://discord.com/assets/aef26397c9a6a3afee9c857c5e6f3317.svg"
                }
            }
            act = {
                    name: name ? name: lang(author, "not-provided"),
                    type: type ? type: lang(author, "not-provided"),
                    state: state ? type: lang(author, "not-provided"),
                    details: details? details: lang(author, "not-provided"),
                    assets: assets ? assets: undefined,
                    starts: starts ? starts: lang(author, "not-provided"),
            }
            return [{"Single": act, "id": identifier}]
        }
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {RichPresence}