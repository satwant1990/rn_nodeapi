import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter post title"]
    },
    description:{
        type:String,
        required:[true,"Please enter post description"]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

export const Post = mongoose.model('Post', postSchema)