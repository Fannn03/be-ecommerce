import express from 'express'
import 'dotenv/config'

const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(process.env.SERVER_PORT, () => {
	console.log(`server started on port ${process.env.SERVER_PORT}`);
})