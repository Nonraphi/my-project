import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose.connect(process.env.MONGODB_CONNECTION)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect to MongDB', err))

export default mongoose