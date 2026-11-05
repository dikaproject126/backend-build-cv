import express from 'express'
import { CreateResume, ReadAllResume } from '../controller/resume.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const ResumeRouter = express.Router()

// api/resume

// post /api/resume
ResumeRouter.post('/', protectedRoute, CreateResume)
// get /api/resume
ResumeRouter.get('/', protectedRoute, ReadAllResume)

export default ResumeRouter;