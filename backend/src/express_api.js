import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import 'dotenv/config';
import { addUser, delUser } from './dynamoOps.js'
import { BAD_REQUEST, OK } from './StatusCode.js';

const app = express();
const port = 8080; // default port to listen
app.use(express.json());
app.use(cors());

const registerRoutes = () => {

    //Greetings
    app.get( "/", ( req, res ) => {
        res.status(OK).json({'message': 'GUAC ON DA BEAT'}).end()
    });

    // To add a user. User info will be in request body. 
    app.put( "/", async ( req, res ) => {
        if(req.body.name && req.body.phone) { 
            const user = {Name: {S: req.body.name}, Phone: {S: req.body.phone}};
            const result = await addUser(user);
            if (result) {
                res.status(OK).end();
            }
            else {
                res.status(BAD_REQUEST).end();
            }
        }
        else {
            res.status(BAD_REQUEST).end()
        }
    });

    // To delete a user. User info stored in body
    app.delete( "/", async ( req, res ) => {
        if(req.body.name && req.body.phone) { 
            const user = {Phone: {S: req.body.phone}};
            const result = await delUser(user);
            if (result) {
                res.status(OK).end();
            }
            else {
                res.status(BAD_REQUEST).end();
            }
        }
        else {
            res.status(402).end();
        }
    }) 
}

registerRoutes();
// start the Express server
app.listen( port, () => {
    console.log( `server started listening at port: ${ port }` );
});
    
export const handler = serverless(app);