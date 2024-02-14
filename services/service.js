import DBService from "./db.service.js";
import model from "../models/model.js";
class Service {
    #dynamoDbClient = (new DBService()).dynamoDbClient;
    async get({ id = null, page, limit }) {
        let response = {
            status: 200,
            data: [],
            error: null
        };
        try {
            if (id != null) {
                const params = {
                    TableName: USERS_TABLE,
                    Key: {
                        userId: id,
                    },
                };
                const { Item } = await this.#dynamoDbClient.send(new GetCommand(params));
                if (Item) {
                    const { userId, name } = Item;
                    response.data.push({ userId, name });
                } else {
                    response.status = 404;
                    response.error = { error: 'Could not find user with provided "userId"' };
                }
            }
            return Promise.resolve(response);
        } catch (error) {
            response.status = 501;
            response.error = error;
            return Promise.reject(response);
        }
    }
    // static async post({ title, important }) {
    //     let response = {
    //         status: 201
    //     };
    //     let connection;
    //     try {
    //         console.log({ title, important });
    //         const todo = new model({ title, important })
    //         connection = await DBService.connect();
    //         await DBService.save(todo);
    //         return Promise.resolve(response);
    //     } catch (error) {
    //         response.status = 501;
    //         response.error = error;
    //         return Promise.reject(response);
    //     } finally {
    //         await connection.close();
    //     }
    // }
    // static async delete({ id }) {
    //     let response = {
    //         status: 200
    //     };
    //     let connection;
    //     try {
    //         connection = await DBService.connect();
    //         await DBService.findByIdAndDelete(id, model);
    //         return Promise.resolve(response);
    //     } catch (error) {
    //         response.status = 501;
    //         response.error = error;
    //         return Promise.reject(response);
    //     } finally {
    //         await connection.close();
    //     }
    // }
}
export default Service;