const express = require('express')
const router = express.Router()


class ItemRouter{
    constructor(controller){
        this.controller = controller
    }

    routes=()=>{
        router.get('/',this.controller.test)
        router.get('/helloWorld', this.controller.helloWorld)
        router.post('/body', this.controller.bodyTest)
        router.post('/insertItem', this.controller.insertItem)
        router.get('/allItems', this.controller.getAllItems)
        router.post('/category', this.controller.addCategory)
        router.get('/:id', this.controller.getItem)
        return router
    }
}

module.exports = ItemRouter