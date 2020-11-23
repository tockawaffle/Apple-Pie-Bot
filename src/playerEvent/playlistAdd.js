module.exports = (client, message, playlist) => {

    message.channel.send(`${playlist.title} has been added to the queue (**${playlist.items.length}** songs) !`);

};