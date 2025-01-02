import mongoose from 'mongoose'
export const ConnectDB = async()=>{
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI)
      console.log(`MONGODB CONNECTED SUCCESSFULLY ${conn.connection.host}` )
    } catch (error) {
        console.log('ERROR IN CONNECTING MONGODB', error)
    }
}