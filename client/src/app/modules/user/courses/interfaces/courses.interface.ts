export interface Course {
    id: number,
    title: string,
    description: string,
    totalSteps: number,
    steps?: {
        order?: number;
        title?: string;
        subtitle?: string;
        content?: string;
    }[];
}
