import { catchAsyncErr } from '../middleware/catchAsyncError.js'
import { Post } from '../models/postModel.js'
import { User } from '../models/userModel.js';

export const createPost = catchAsyncErr(async (req, resp, next) => {

    const { title, description } = req.body;

    const post = await Post.create({
        title,
        description,
        owner:req.user._id
    })

    const user = await User.findById(req.user._id);
    user.posts.unshift(post._id);
    await user.save();
    resp.status(200).json({
        success: true,
        message: "Post Created Successfully",
    })

})