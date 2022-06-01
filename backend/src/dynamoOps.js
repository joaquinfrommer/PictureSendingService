import { DynamoDBClient, PutItemCommand, DeleteItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import 'dotenv/config';

const tableName = 'PicSenderUserTable';
const ddbClient = new DynamoDBClient({ region: "us-east-1" });

//Adds user, takes in a user object
//User object:
//{Name: 'name', Phone: 'phone #'}
export async function addUser(user) {
    console.log(user);
    const params = {
        TableName : tableName,
        Item: user
    };
    
    try {
        const data = await ddbClient.send(new PutItemCommand(params));
        console.log("Success, user added", data);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

//Deletes user from the dynamodb table, {Name: 'name', Phone: 'phone #'}
export async function delUser(user) {
    let params = {
        TableName: tableName,
        Key: user
    };

    try {
        const data = await ddbClient.send(new DeleteItemCommand(params));
        console.log("Success, user deleted", data);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

function mapData(data) {
    const user = {'Phone': data.Phone.S, 'Name': data.Name.S};
    return user;
}

//Gets a list of all users signed up for the service 
export async function allUsers() {
    const params = {TableName: tableName};
    try {
        const data = await ddbClient.send(new ScanCommand(params));
        return data.Items.map(mapData);
    } catch (e) {
        console.log(e);
        return null;
    }
}