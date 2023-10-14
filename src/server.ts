import app from './app'
import 'dotenv/config'
import { transport } from './config/mailer'

app.listen(process.env.SERVER_PORT, async () => {
	const mailer = await transport.verify()
	if(!mailer) throw new Error(mailer)
	console.log('mailer ready');
	
	console.log(`server started on port ${process.env.SERVER_PORT}`);
})