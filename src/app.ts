import express from 'express'
import 'dotenv/config'
import apiRouter from './routers/api-router'

const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(apiRouter)

export default app