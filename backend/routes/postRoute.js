import express from 'express'
import { createPost } from '../controller/postController.js';
import { isAuthenticated } from '../middleware/auth.js'
const router = express.Router()

router.route('/post/create').post(isAuthenticated, createPost)


export default router;