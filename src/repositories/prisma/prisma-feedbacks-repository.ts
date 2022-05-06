import { prisma } from "../../prisma";
import { FeedbackCrateProps, FeedbackRepository } from "../feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbackRepository {
    async create({ type, comment, screenshot }: FeedbackCrateProps) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        })
    }
}