import express from 'express'
import { getAllUsers, getUserById, loginUser, logoutUser, registerUser } from '../controller/userController.js';
import {isAuthenticated} from '../middleware/auth.js'
const router = express.Router()

router.route('/users').get(getAllUsers)
router.route('/user/add').post(registerUser)
router.route('/logout').get(logoutUser)
router.route('/login').post(loginUser)
router.route('/user/:id').get(isAuthenticated, getUserById)



export default router;