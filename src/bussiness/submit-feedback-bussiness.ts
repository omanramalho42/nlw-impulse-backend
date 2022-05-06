import { MailAdapter } from "../middlewares/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackBussinessRequest {
    type: string;
    comment: string;
    screenshot?: string | null;
}

export class SubmitFeedbackBussiness {
    constructor(
        private feedbacksRepository: FeedbackRepository,
        private mailAdapter: MailAdapter,
    ) {}
    
    async execute(request: SubmitFeedbackBussinessRequest) {
        const { type, comment, screenshot } = request

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }
        
        if(!type) {
            throw new Error('Type is required.')
        }

        if(!comment) {
            throw new Error('Comment is required.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />` : ``,
                `</div>`
            ].join('\n')
        })
    }
}