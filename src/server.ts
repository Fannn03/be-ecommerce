import app from './app'
import 'dotenv/config'
import { transport } from './config/mailer'
import createPublic from './helpers/server/create-public'
import { connectMongoDB } from './config/mongoose'

app.listen(process.env.SERVER_PORT, async () => {
	try {
		const mailer = await transport.verify()
		if(!mailer) throw new Error(mailer)
		console.log('mailer ready');

		await connectMongoDB();
		
		createPublic();
		console.log(`server started on port ${process.env.SERVER_PORT}`);
	} catch (err) {
		console.log(err);
	}
})