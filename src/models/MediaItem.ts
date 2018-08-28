export type MediaItem = {
    id: number;
    content: {
        type: string;
        data: number[];
    };
    created: Date;
    key: string;
    mimeType: string;
};
