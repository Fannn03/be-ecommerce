import express from 'express'
import 'dotenv/config'
import apiRouter from './routers/api-router'
import { transport } from './config/mailer'

const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(apiRouter)

app.listen(process.env.SERVER_PORT, async() => {
	const mailer = await transport.verify()
	if(!mailer) throw new Error(mailer)
	console.log('mailer ready');
	
	console.log(`server started on port ${process.env.SERVER_PORT}`);
})