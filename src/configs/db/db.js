const moongose = require('mongoose')
module.exports = moongose.connect(process.env.mongodb, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    keepAlive: true,
})