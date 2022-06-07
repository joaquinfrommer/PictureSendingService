import { allUsers } from './dynamoOps.js';
import axios from 'axios';
import twilio from 'twilio';
import 'dotenv/config';

const img_endpoint = `https://api.thedogapi.com/v1/images/search?api_key=${process.env.DOG_API_KEY}`
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twlPhone = process.env.TW_PHONE
const twClient = new twilio(accountSid, authToken);

async function getImage() {
    try {
        const res = await axios.get(img_endpoint);
        const img_url = res.data[0].url;
        return img_url;
    } catch (e) {
        console.error(e);
        return '';
    }
}

function send_error(e) {
    console.log(e);
}

async function send_picture(user, image, callback) {
    const user_name = user.Name;
    const user_phone = user.Phone;
    try{
        const message = await twClient.messages.create({
            body: `Hi ${user_name}! Enjoy your dog :)`,
            from: twlPhone,
            mediaUrl: [image],
            to: user_phone
          });

        console.log(message.sid);
        return callback(null, {result: 'success'});
        // return message;
    } catch (e) {
        send_error(e);
        return callback("error");
        // return e
    }
}

// async function send_picture() {
    
// }

async function send_to_user(user, callback) {
    const dog_image = await getImage();
    if (!dog_image) {
        send_error("Image not available");
        return;
    }
    console.log("Using image:", dog_image);
    const message = await send_picture(user, dog_image, callback);
    console.log(message);
    return ;
}

async function send(event, context, callback) {
    const users = await allUsers();
    if (!users) {
        send_error("DynamoDB Issue!");
        return ;
    }
    console.log("Attempting to send to users in list", users);
    users.forEach(user => send_to_user(user, callback));
    return ; 
}

export const handler = send;