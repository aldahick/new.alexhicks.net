import * as db from "models";
import { APIEndpoint } from "lib";

export type CreateParams = {
    key: string;
    mimeType: string;
    content: string;
};
export type CreateResponse = {
    mediaItem: db.MediaItem;
};

export type DeleteParams = {
    id: number;
};
export type DeleteResponse = {
    ok: true;
};

export type GetContentParams = {
    id: number;
};
export type GetContentResponse = Blob | string;

export type GetDirsParams = {
    dir?: string;
};
export type GetDirsResponse = {
    directories: string[];
};

export type GetManyParams = GetDirsParams;
export type GetManyResponse = {
    mediaItems: db.MediaItem[];
};

type GetOneParams = {
    id: number;
};
type GetOneResponse = {
    mediaItem: db.MediaItem;
};

type UpdateParams = {
    id: number;
    key: string;
    mimeType?: string;
    content: string;
};
type UpdateResponse = {
    ok: true;
};

export class MediaEndpoints {
    readonly create = APIEndpoint<CreateParams, CreateResponse>("post", "/media");
    readonly delete = APIEndpoint<DeleteParams, DeleteResponse>("delete", "/media/:id");
    readonly getContent = APIEndpoint<GetContentParams, GetContentResponse>("get", "/media/:id/content");
    readonly getDirs = APIEndpoint<GetDirsParams, GetDirsResponse>("get", "/media/dirs");
    readonly getMany = APIEndpoint<GetManyParams, GetManyResponse>("get", "/media");
    readonly getOne = APIEndpoint<GetOneParams, GetOneResponse>("get", "/media/:id");
    readonly update = APIEndpoint<UpdateParams, UpdateResponse>("patch", "/media/:id");
}
