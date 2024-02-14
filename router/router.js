import Controller from "../controllers/controller.js"
const Router = {
    'post': {
        '/users': (request, response)=>Controller.post(request, response)
    },
    // 'delete': {
    //     '/todo/:id': (request, response)=>Controller.delete(request, response)
    // },
    'get': {
        '/users/:userId': (request, response)=>Controller.get(request, response)
    }
    
}
export default Router;