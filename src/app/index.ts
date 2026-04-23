import express from 'express'
import type { Express } from 'express'
import {authRouter} from '../auth/auth.routes.js'
import { todoRouter } from '../todo/todo.routes.js'
import {isauthenticated} from '../comman/auth.middleware/auth.middlerware.js'
function createExpressApplication():Express{
    const app=express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/auth/',authRouter)
    app.use('/todo/',isauthenticated,todoRouter)
    app.get('/userinfo',isauthenticated,(req,res)=>{
        res.json(req.body)
    })
    return app

}

export default createExpressApplication