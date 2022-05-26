import { DynamoDBClient, PutItemCommand, DeleteItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

const tableName = process.env.TABLE_NAME || 'PicSenderUserTable';
const ddbClient = new DynamoDBClient({ region: "us-east-1" });

//Adds user, takes in a user object
//User object:
//{Name: 'name', Phone: 'phone #'}
export function addUser(user) {
    const params = {
        TableName : tableName,
        Item: user
    };
    const addUserResult = async () => {

        try {
            const data = await ddbClient.send(new PutItemCommand(params));
            console.log("Success, user added", data);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    return addUserResult;
}

//Deletes user from the dynamodb table, {Name: 'name', Phone: 'phone #'}
export function delUser(user) {
    let params = {
        TableName: tableName,
        Key: {Phone: user.Phone, Name: user.Name}
    };
    const delResult = async () => {
        try {
            const data = await ddbClient.send(new DeleteItemCommand(params));
            console.log("Success, user deleted", data);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    return delResult;
}

//Gets a list of all users signed up for the service 
export function allUsers() {
    const params = {TableName: tableName};
    const scanResult = async () => {
        try {
            const data = await ddbClient.send(new QueryCommand(params));
            console.log(data);
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    return scanResult
}