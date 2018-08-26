import * as db from "models";

export type Params = {
    dir?: string;
};

export type Response = {
    mediaItems: db.MediaItem[];
};
