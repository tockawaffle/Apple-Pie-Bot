const ytdl = require("ytdl-core");

var servers = {};

module.exports = {
    aliases: ['vibe'],
    description: "Plays music", 
    run: async(client, message, args) => {

        const owner = client.users.cache.get('723185654044950539')

        if(message.author.id === owner.id) {

            try{
                function play(connection, message){
                    var server = servers[message.guild.id];
        
                    server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
        
                    server.queue.shift();
        
                    server.dispatcher.on("end", function(){
                        if(server.queue[0]){
                            play(connection, message);
                        }else {
                            connection.disconnect();
                        }
                    })
        
                }
                if(!args[2]){
                    message.channel.send("You need to provide a link!")
                    console.log(args)
                    return;
                }
                
                if(!message.member.voice.channel){
                    message.channel.send("You must be in a voice channel to play music silly!")
                    console.log('checked for VC');
                    return;
                }
        
                if(!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                }
                
                var server = servers[message.guild.id];
                
                server.queue.push(args[1]);
        
                if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
                    play(connection, message);
                })
            }catch(err) {
                console.log(err)
            }
            
            console.log('Se você não usou isso, houve uma falha na segurança do bot!\nrun: <command name>')
        } else return console.log('Segurança funcionou:\nFailed to <command name>')
    }
}