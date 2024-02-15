import Controller from "../controllers/controller.js"
const Router = {
    'post': {
        '/products': (request, response)=>Controller.post(request, response)
    },
    // 'delete': {
    //     '/todo/:id': (request, response)=>Controller.delete(request, response)
    // },
    'get': {
        '/products/:productId': (request, response)=>Controller.get(request, response)
    }
    
}
export default Router;