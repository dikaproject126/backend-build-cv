import express from 'express'
import { CreateResume, DeleteResumebyId, DetailResumebyId, DetailResumePublicbyId, ReadAllResume, UpdateResumeById } from '../controller/resume.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import Resume from '../models/resume.js';
import uploadFile from '../configs/multer.js';

const ResumeRouter = express.Router()

// api/resume

// post /api/resume
ResumeRouter.post('/', protectedRoute, CreateResume)
// get /api/resume
ResumeRouter.get('/', protectedRoute, ReadAllResume)

// delete /api/resume/:resumeId
ResumeRouter.delete('/:resumeId', protectedRoute, DeleteResumebyId)
// get /api/resume/:resumeId
ResumeRouter.get('/:resumeId', protectedRoute, DetailResumebyId)
// get /api/resume/public/:resumeId
ResumeRouter.get('/public/:resumeId', DetailResumePublicbyId)
// put /api/resume/:resumeId
ResumeRouter.put('/:resumeId', protectedRoute, uploadFile.single("image"), UpdateResumeById) 

export default ResumeRouter;