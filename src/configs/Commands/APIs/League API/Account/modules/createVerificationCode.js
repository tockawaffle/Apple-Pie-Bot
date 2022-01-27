function createVerificationCode(messageCreate) {
    var code = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++)
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    return code+messageCreate.author.id;
}

module.exports = {createVerificationCode}