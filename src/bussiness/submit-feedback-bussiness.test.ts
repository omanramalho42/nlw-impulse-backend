import { SubmitFeedbackBussiness } from "./submit-feedback-bussiness"

// SPIES
const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackBussiness(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,812isdniadnaisdnas',
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('should not be able to submit feedback without type', async () => {     
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,812isdniadnaisdnas',
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback without comment', async () => {     
        await expect(submitFeedback.execute({
            type: 'Example type',
            comment: '',
            screenshot: 'data:image/png;base64,812isdniadnaisdnas',
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback without invalid screenshot', async () => {     
        await expect(submitFeedback.execute({
            type: 'Example type',
            comment: 'Example invalid',
            screenshot: 'test.jpg',
        })).rejects.toThrow()
    })
})