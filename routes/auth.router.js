import express from 'express'
import {LoginUser, RegisterUser, LogoutUser, CurentUser} from '../controller/auth.controller.js'

const AuthRouter = express.Router();

AuthRouter.post('/login', LoginUser)
AuthRouter.post('/register', RegisterUser)
AuthRouter.post('/logout', LogoutUser)
AuthRouter.get('/me', CurentUser)

export default AuthRouter