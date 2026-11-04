import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and Password Required'
            })
        }

        // check user yang diinput sudah terdaftar atau tidak
        const currentUser = await User.findOne({ email: email })

        if (!currentUser) {
            return res.status(400).json({
                message: 'Invalid Email or Password'
            })
        }

        const ComparePassword = bycrypt.compareSync(password, currentUser.password)

        if (!ComparePassword) {
            return res.status(400).json({
                message: 'Password Invalid'
            })
        }

        generateToken(res, currentUser._id)

        res.status(201).json({
            message: 'Login Berhasil',
            user: {
                id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: err.message
        })
    }

}

export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const userEmail = await User.findOne({ email: email })

        if (userEmail) {
            return res.status(400).json({
                message: 'Email is already Existing'
            })
        }

        const hashPassword = await bycrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })

        generateToken(res, newUser._id)

        res.status(201).json({
            message: 'Register Berhasil',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        })

    } catch (err) {
        if (err.name == "ValidationError") {
            return res.status(400).json({
                message: err.message
            })
        }
        return res.status(500).json({
            message: err.message
        })
    }

}

export const LogoutUser = (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })

        res.status(200).json({
            message: 'Logout Success'
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const CurentUser = (req, res) => {
    try {
        res.status(200).json({
            message: 'Get Request User Success',
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'error.message'
        })
    }

}