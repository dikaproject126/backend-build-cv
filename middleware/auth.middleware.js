import jwt from 'jsonwebtoken'
import User from '../models/user.js';

export const protectedRoute = async(req, res, next) => {
    try {
        let token;
        token = req.cookies.jwt;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                const currentUser = await User.findById(decoded.userId).select('-password')

                req.user = {
                    id: currentUser._id,
                    name: currentUser.name,
                    email: currentUser.email
                }

                next()
            } catch (error) {
                return res.status(403).json({
                    message: "Autorization Error, Current User Not Found"
                })
            }
        } else {
            return res.status(403).json({
                message: "Autorization Error, Token Not Found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Autorization Error, Server Down"
        })
    }
}