async function memberStatus(author, userToGet) {
    try {
        const lang = require("@lang")
        const moment = require("moment")
        const username = userToGet.user.username
        const id = userToGet.user.id
        const created = userToGet.user.createdAt
        const formattedCreate = moment(created).locale("pt-br").format("L")
        const createdFromNow = moment(created).fromNow()
        const joined = userToGet.joinedAt 
        const joinedFormat = moment(joined).locale('pt-br').format('L')
        const joinedFrom = moment(joined).fromNow()

        let richStatus = userToGet.presence.status
        if(richStatus === 'dnd') richStatus = `${lang(author, 'dnd')}`
        else if (richStatus === 'idle') richStatus = `${lang(author, 'idle')}`
        else if (richStatus === 'online') richStatus = 'Online'
        else if (richStatus === 'offline') richStatus = 'Offline'
        
        let response;
        return response = [
            {
                username: username ? username: lang(author, "not-found"),
                id: id ? id: lang(author, "not-found"),
                created: formattedCreate ? formattedCreate : lang(author, "not-found"),
                createdFromNow: createdFromNow ? createdFromNow: lang(author, "not-found"),
                presence: richStatus? richStatus: lang(author, "not-found"),
                joinedAt: joinedFormat,
                joinedFrom: joinedFrom
            }
        ]
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {memberStatus}