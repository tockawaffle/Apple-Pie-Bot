const moongose = require('mongoose')
module.exports = moongose.connect('mongodb://applepie:Bolinho321@172.18.0.1:27017/?authSource=admin', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    keepAlive: true,
})