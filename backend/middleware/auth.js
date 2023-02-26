import Jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js';
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncErr } from "./catchAsyncError.js";

export const isAuthenticated = catchAsyncErr( async(req, resp, next)=>{
    const {token} = req.cookies
    if(!token)
    {
        return next(new ErrorHandler('Please login first',401))
    }
    const decode = await Jwt.verify(token, process.env.JWT_TOKEN);
    req.user = await User.findById(decode._id)
    next()
})