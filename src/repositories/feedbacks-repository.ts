export interface FeedbackCrateProps {
    type: string;
    comment: string;
    screenshot?: string | null;
}

export interface FeedbackRepository {
    create: (type: FeedbackCrateProps) => Promise<void>;
}