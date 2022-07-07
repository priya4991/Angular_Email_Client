export interface EmailSummary {
    id: string;
    subject: string;
    from: string;
};

export interface Email {
    id: string;
    subject: string;
    text: string;
    from: string;
    to: string;
    html: string;
}