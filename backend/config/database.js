import mongoose from "mongoose";

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true
    })
    .then(({connection})=> console.log(`MongoDB is connected ${connection.host}`))
    .catch((error)=> console.log(error))
}

export default connectDatabase
