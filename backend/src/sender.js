import { allUsers } from './dynamoOps.js';
import axios from 'axios';
import twilio from 'twilio';
import 'dotenv/config';

const img_endpoint = `https://api.thedogapi.com/v1/images/search?api_key=${process.env.DOG_API_KEY}`
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twlPhone = process.env.TW_PHONE
const twClient = new twilio(accountSid, authToken);
const twilio_endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`

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

async function send_picture(user, image) {
    const user_name = user.Name;
    const user_phone = user.Phone;
    try{
        const message = await twClient.messages.create({
            body: `Hi ${user_name}! Enjoy your dog :)`,
            from: twlPhone,
            mediaUrl: [image],
            to: user_phone
          });
        return message;
    } catch (e) {
        return e;
    }
}

async function send_to_user(user) {
    const dog_image = await getImage();
    if (!dog_image) {
        send_error("Image not available");
        return 0;
    }
    console.log("Using image:", dog_image);
    const message = await send_picture(user, dog_image);
    
    if (message.sid) {
        console.log(message.sid);
        return 1;
    } else {
        send_error(message);
        return 0;
    }   
    return 0; 
}

async function send() {
    const users = await allUsers();
    if (!users) {
        send_error("DynamoDB Issue!");
        return ;
    }
    
    console.log("Attempting to send to users in list", users);
    let num_sent = 0;
    for (const user of users){
        const res = await send_to_user(user);
        num_sent += res;
    }

    console.log(`Sent ${num_sent}/${users.length} messages.`)
    return 0; 
}

export const handler = send;