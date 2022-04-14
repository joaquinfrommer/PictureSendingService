import { DynamoDB } from 'aws-sdk'

const tableName = process.env.TABLE_NAME || 'PicSenderUserTable';
const client =  new DynamoDB.DocumentClient();

//Adds user, takes in a user object
//User object:
//{name: 'name', phone: 'phone #'}
export async function addUser(user) {
    const addUserResult = () => {
        try {
            await client.put({
                TableName : tableName,
                Item: user
            }).promise()
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    return addUserResult;
}

//Deletes user from the dynamodb table, takes in a correctly formatted phone string
export async function delUser(phone) {
    let params = {
        TableName: tableName,
        Key: {Phone: phone}
    };
    const delResult = () => {
        try {
            await this.client.delete(params).promise()
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    return delResult;
}

//Gets a list of all users signed up for the service 
export async function allUsers() {
    let params = {TableName: tableName};
    const scanResult = () => {
        try {
            const data = await this.client.scan(params).promise()
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    return scanResult
}