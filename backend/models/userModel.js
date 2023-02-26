import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter user name"]
    },
    email: {
        type: String,
        required: [true, "Please enter Email"],
        unique: [true, "Email already exist"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [6, "password must be 6 characters"],
        select: false
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"

    }]
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})
userSchema.methods.generateToken = function () {
    return Jwt.sign({ _id: this._id }, process.env.JWT_TOKEN);
}

userSchema.methods.matchPaswrod = async function (password) {
    return await bcrypt.compare(password, this.password);
}


export const User = mongoose.model('User', userSchema)