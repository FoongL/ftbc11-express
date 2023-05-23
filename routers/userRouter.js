const express = require('express')
const router = express.Router()


class UserRouter{
    constructor(controller){
        this.controller = controller
    }

    routes=()=>{
        router.get('/',this.controller.test)
        router.get('/helloWorld', this.controller.helloWorld)
        router.post('/body', this.controller.bodyTest)
        router.get('/all', this.controller.getAllUsers)
        //router.post('/getOne', this.controller.getUser)
        router.post('/newUser', this.controller.insertUser)
        router.get('/userItems/:id', this.controller.getUsersItems)
        
        return router
    }
}

module.exports = UserRouter