import express, { Request, Response } from 'express'

import { SubmitFeedbackBussiness } from './bussiness/submit-feedback-bussiness';
import { NodemailerMailAdapter } from './middlewares/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';

export const routes = express.Router()

routes.post('/feedbacks', async (req: Request, res: Response) => {
    const { type, comment, screenshot } = req.body

    try {
        const prismaFeedbackRepository = new PrismaFeedbackRepository()
        const nodemailerMailAdapter = new NodemailerMailAdapter()
        
        const submitFeedbackBussiness = new SubmitFeedbackBussiness(
            prismaFeedbackRepository,
            nodemailerMailAdapter
        )
    
        await submitFeedbackBussiness.execute({
            type,
            comment,
            screenshot
        })
        
        return res.status(201).send()
    } catch(err) {
        console.log(err)

        return res.status(500).send()
    }

   
})