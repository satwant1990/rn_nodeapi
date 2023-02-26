import ErrorHandler from "../utils/errorHandler.js";

export const errorMidldleware = (err, req, resp, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'internal server error';

    if(err.code===11000)
    {
        err.message = 'Email Already Exists';
        err.statusCode = 400
    }
    resp.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
