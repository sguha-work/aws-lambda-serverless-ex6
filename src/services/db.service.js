import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
    GetCommand,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
class DB {
    #client = null;
    #dynamo = null;
    constructor() {
        this.#client = new DynamoDBClient({});
        this.#dynamo = DynamoDBDocumentClient.from(this.#client);
    }
    async execute(operation = null, TableName = null, Key = null, Item = null) {
        let output = null;
        try {
            let data;
            switch (operation) {
                case "DELETE":
                    await this.#dynamo.send(
                        new DeleteCommand({
                            TableName,
                            Key
                        })
                    );
                    output = Key;
                    break;
                case "GET":
                    data = await this.#dynamo.send(
                        new GetCommand({
                            TableName,
                            Key,
                        })
                    );
                    output = data;
                    break;
                case "SCAN":
                    data = await this.#dynamo.send(
                        new ScanCommand({ TableName })
                    );
                    output = data;
                    break;
                case "PUT":
                    await this.#dynamo.send(
                        new PutCommand({
                            TableName,
                            Item
                        })
                    );
                    output = Item;
                    break;
                default:
                    throw new Error(`Unsupported operation`);
            }
            return Promise.resolve(output);
        } catch (err) {
            output = err.message;
            return Promise.reject(output);
        } finally {
        }
    }
}
const DBService = new DB();
export default DBService;