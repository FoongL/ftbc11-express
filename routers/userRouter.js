const express = require('express')
const router = express.Router()


class UserRouter{
    constructor(controller, jwtAuth){
        this.controller = controller
        this.auth = jwtAuth
    }

    routes=()=>{
        router.get('/',this.controller.test)
        router.get('/helloWorld', this.controller.helloWorld)
        router.post('/body', this.controller.bodyTest)
        router.get('/all', this.controller.getAllUsers)
        //router.post('/getOne', this.controller.getUser)
        router.post('/newUser', this.controller.insertUser)
        router.post('/signin', this.controller.signin)
        router.get('/userItems/:id', this.controller.getUsersItems)
        router.get('/jwtTest', this.auth,this.controller.tokenTest)
        
        return router
    }
}

module.exports = UserRouter