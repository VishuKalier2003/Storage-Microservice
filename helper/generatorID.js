function generateTransactionID(fromUser) {
    let ID = "";
    for(let i = 0; i < 15; i++)
        ID += ""+Math.floor(Math.random()*10);
    ID += fromUser
    return ID;
}

function generateUserID(user) {
    let ID = "";
    for(let i = 0; i < user.length; i++) {
        if(user.charAt(i) == ' ')   break;
        ID += user.charAt(i);
    }
    for(let i = 0; i < 4; i++)
        ID += ""+Math.floor(Math.random()*10);
    return ID;
}

module.exports = {generateTransactionID, generateUserID}