function makeid(length) {
    var 
        result = '',
        characters = '0123456789',
        charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return result;
}
module.exports = {makeid}
