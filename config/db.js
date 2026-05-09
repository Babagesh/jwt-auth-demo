import {mongoose} from 'mongoose'
const connectDB = async () => {
    try{
        await mongoose.connect(proces.env.MONGO_URI, {
            useNewURLParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected")
    }
    catch(err)
    {
        console.error("MongoDB Connection Error", err.message)
        process.exit(1)
    }
};


export default connectDB