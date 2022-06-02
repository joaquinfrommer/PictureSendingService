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

function send_error() {
    console.log("DynamoDB Issue!")
}

function send_picture(user, image) {
    const user_name = user.Name;
    const user_phone = user.Phone;
    try {
        const message = twClient.messages.create({
            body: `Hi ${user_name}! Enjoy your dog :)`,
            from: twlPhone,
            mediaUrl: [image],
            to: user_phone
          });
        console.log(message);
        console.log("Sent!");
    } catch(e) {
        console.log(e);
    }
}

async function send() {
    console.log("Attempting to send!")
    const img = await getImage();
    const users = await allUsers();
    if (!users || !img) {
        send_error();
        return ;
    }
    console.log("Attempting to send to users in list", users);
    users.forEach(user => send_picture(user, img))
    return ; 
}

export const handler = send;