async function memberStatus(author, userToGet) {
    try {
        const 
            lang = require("@lang"),
            moment = require("moment"),
            username = userToGet.user.username,
            id = userToGet.user.id,
            created = userToGet.user.createdAt,
            formattedCreate = moment(created).locale("pt-br").format("L"),
            createdFromNow = moment(created).fromNow(),
            joined = userToGet.joinedAt,
            joinedFormat = moment(joined).locale('pt-br').format('L'),
            joinedFrom = moment(joined).fromNow();

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