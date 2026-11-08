import imageKitStorage from "../configs/imagekit.js"
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
        const checkResume = await Resume.findById(resumeId)

        if(!checkResume) {
            return res.status(404).json({
                message: 'Resume Not Found'
            })
        }

        if(checkResume.personalInfo.imageId){
            await imageKitStorage.files.delete(checkResume.personalInfo.imageId)
        }

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

export const UpdateResumeById = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const { resumeId } = req.params
        const { resumeData, removeBackground } = req.body

        let resumeDataJson = JSON.parse(resumeData)

        const checkResume = await Resume.findById(resumeId)

        if (!checkResume) {
            return res.status(404).json({
                message: 'Data tidak ditemukan'
            })
        }

        if (req.file) {
            resumeDataJson.personalInfo.image = "";
            resumeDataJson.personalInfo.imageId = "";

            const result = await imageKitStorage.files.upload({
                file: req.file.buffer.toString("base64"),
                fileName: req.file.originalname,
                folder: '/resume',
                transformation: {
                    pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : "")
                }
            })

            resumeDataJson.personalInfo.image = result.url
            resumeDataJson.personalInfo.imageId = result.fileId
        }

        const resume = await Resume.findOneAndUpdate({
            _id: resumeId,
            userId: currentUserId
        },
            resumeDataJson,
            {
                returnDocument: 'after'
            }
        )

        if (!resume) {
            return res.status(400).json({
                message: 'Update Resume Failed'
            })
        }

        return res.status(200).json({
            message: 'Update Resume Successfully',
            resume: resume
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}