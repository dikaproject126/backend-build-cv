import express from 'express'
import {LoginUser, RegisterUser, LogoutUser, CurentUser} from '../controller/auth.controller.js'
import { protectedRoute } from '../middleware/auth.middleware.js';

const AuthRouter = express.Router();

AuthRouter.post('/login', LoginUser)
AuthRouter.post('/register', RegisterUser)
AuthRouter.post('/logout', protectedRoute, LogoutUser)
AuthRouter.get('/me', protectedRoute,CurentUser)

export default AuthRouter