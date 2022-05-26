import DynamoDB from 'aws-sdk'

const tableName = process.env.TABLE_NAME || 'PicSenderUserTable';
const client =  new DynamoDB.DocumentClient();

//Adds user, takes in a user object
//User object:
//{name: 'name', phone: 'phone #'}
export function addUser(user) {
    const addUserResult = () => {
        try {
            client.put({
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
export function delUser(phone) {
    let params = {
        TableName: tableName,
        Key: {Phone: phone}
    };
    const delResult = () => {
        try {
            this.client.delete(params).promise()
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
    let params = {TableName: tableName};
    const scanResult = () => {
        try {
            const data = this.client.scan(params).promise()
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    return scanResult
}