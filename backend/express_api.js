import express from 'express';
import 'dotenv/config';
import { BAD_REQUEST, OK } from './StatusCode';

const app = express();
const port = 8080; // default port to listen
const serverless = require('serverless-http');
var cors = require('cors');
app.use(express.json());
app.use(cors());

const registerRoutes = () => {
    // To add a user. User info will be in request body. 
    app.get( "/", ( req, res ) => {
        console.log(req)
        res.status(OK).json({'message': 'hello!'});
    });

    // To delete a user. User info stored in body
    app.delete( "/", ( req, res ) => {
        //TODO: Do
        console.log(req)
        res.status(OK).json({'message': 'Delete!'});
    }) 
}

registerRoutes();
// start the Express server
app.listen( port, () => {
    console.log( `server started listening at port: ${ port }` );
});
    
module.exports.handler = serverless(app);