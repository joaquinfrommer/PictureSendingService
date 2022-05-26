import { allUsers } from './dynamoOps.js'

function getImage() {
    //TODO
}

function send_error() {
    console.log("oops")
}

function send_picture(user) {
    console.log(user)
}

function send() {
    users = allUsers()
    if (!users) {
        send_error();
        return ;
    }

    for (user in users) {
        send_picture(user);
    }
    
    return ; 
}

module.exports.handler = send;