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

        const resumes = await Resume.find({ userId: userId })

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

export const DeleteResumebyId = async (req, res) => {
    try {
        const currentUser = req.user.id
        const { resumeId } = req.params

        await Resume.findOneAndDelete({ _id: resumeId, userId: currentUser._id });

        return res.status(200).json({
            message: 'Delete Resume Successfully'
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const DetailResumebyId = async (req, res) => {
    try {
        const currentUser = req.user.id
        const { resumeId } = req.params

        const resume = await Resume.findOne({ _id: resumeId, userId: currentUser._id });

        if (!resume) {
            return res.status(404).json({
                message: 'Resume Not Found'
            })
        }

        return res.status(200).json({
            message: 'Detail Resume Successfully',
            resume: resume
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// Dilihat oleh User lain secara Public nanti
export const DetailResumePublicbyId = async (req, res) => {
    try {
        const { resumeId } = req.params

        const resume = await Resume.findOne({ _id: resumeId, public: true });

        if (!resume) {
            return res.status(404).json({
                message: 'Resume Not Found'
            })
        }

        return res.status(200).json({
            message: 'Detail Resume Public Successfully',
            resume: resume
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}