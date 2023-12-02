import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import apiRouter from './routers/api-router'

const app: express.Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public/images'))

app.use(apiRouter)

export default app