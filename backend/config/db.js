import mongoose from 'mongoose'

//connect
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to db ${mongoose.connection.host}`)
    } catch (error) {
        console.log("db error ",error)
    }
}
//export
export default connectDb;
