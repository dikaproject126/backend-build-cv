import Resume from "../models/resume.js"

export const CreateResume = async (req, res) => {
    try {
        const userId = req.user.id

        const { title } = req.body

        // Create Resume
        const newResume = await Resume.create({
            userId: userId,
            title: title
        })

        res.status(201).json({
            message: 'Create Resume Successfully', 
            resume: newResume
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

export const ReadAllResume = async (req, res) => {
    try {
        const userId = req.user.id

        const resumes = await Resume.find({userId: userId})

        return res.status(200).json({
            message: 'Get All Resume Successfully',
            resume: resumes
        })
        
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}