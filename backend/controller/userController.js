import ErrorHandler from "../utils/errorHandler.js"
import { catchAsyncErr } from "../middleware/catchAsyncError.js"
import { User } from '../models/userModel.js'


export const getAllUsers = catchAsyncErr(async (req, resp, next) => {
    const { email } = req.body
    if (!email) {
        return next(new ErrorHandler('error handler working', 400))
    }
    resp.status(200).json({
        success: true,
        message: 'Route is working'
    })

})

export const getUserById = catchAsyncErr(async(req,resp,next)=>{
    const {id} = req.params;
    if(!id)
    {
        return next(new ErrorHandler('User Id missing', 400)) 
    }
    const user = await User.findById(id).populate("posts")
    if(!user)
    {
        return next(new ErrorHandler('User not found', 400)) 
    }
    resp.status(200).json({
        success:true,
        user
    })
})

export const registerUser = catchAsyncErr(async (req, resp, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new ErrorHandler('All fields required', 401));
    }
    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.generateToken();
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }


    resp.status(200).cookie("token", token, cookieOptions).json({
        success: true,
        message: "User Created successfully",
        user
    })

})

export const loginUser = catchAsyncErr(async (req, resp, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('All fields required', 401));
    }
    let user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler('User not found', 401));
    }
    const isMatch = await user.matchPaswrod(password);
    if (!isMatch) {
        return next(new ErrorHandler('Email or password is incorrect', 401));
    }
    const token = user.generateToken();
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    resp.status(200).cookie("token", token, cookieOptions).json({
        success: true,
        message: "user login successfully",
        user
    })
})


export const logoutUser = catchAsyncErr(async (req, resp, next) => {
    const cookieOptions = {
        expires: new Date(Date.now()),
        httpOnly: true
    }
    resp.status(200).cookie("token", null, cookieOptions).json({
        success: true,
        message: "User Logout successfully"
    })
})



