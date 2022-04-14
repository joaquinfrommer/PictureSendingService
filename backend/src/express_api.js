import express from 'express';
import 'dotenv/config';
import { addUser, delUser } from './dynamoDB'
import { BAD_REQUEST, OK } from './StatusCode';

const app = express();
const port = 8080; // default port to listen
const serverless = require('serverless-http');
var cors = require('cors');
app.use(express.json());
app.use(cors());

const registerRoutes = () => {
    // To add a user. User info will be in request body. 
    app.put( "/", ( req, res ) => {
        console.log(req)
        if(req.body.name && req.body.phone) { 
            const user = {Name: req.body.name, Phone: req.body.phone};
            if (addUser(user)) {
                res.status(OK);
            }
            else {
                res.status(BAD_REQUEST);
            }
        }
        else {
            res.status(BAD_REQUEST)
        }
    });

    // To delete a user. User info stored in body
    app.delete( "/", ( req, res ) => {
        if(req.body.phone) { 
            const phone = req.body.phone;
            if (delUser(phone)) {
                res.status(OK);
            }
            else {
                res.status(BAD_REQUEST);
            }
        }
        else {
            res.status(BAD_REQUEST)
        }
    }) 
}

registerRoutes();
// start the Express server
app.listen( port, () => {
    console.log( `server started listening at port: ${ port }` );
});
    
module.exports.handler = serverless(app);