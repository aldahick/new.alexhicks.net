import { APIEndpoint } from "lib";

export type CanRegisterResponse = {
    canRegister: boolean;
};

export type CreateParams = {
    username: string;
    password: string;
};
export type CreateResponse = {
    id: number;
    token: string;
};

export type GenerateTokenParams = {
    username: string;
    password: string;
};
export type GenerateTokenResponse = {
    token: string;
};

export class UserEndpoints {
    readonly canRegister = APIEndpoint<void, CanRegisterResponse>("get", "/user/canRegister");
    readonly create = APIEndpoint<CreateParams, CreateResponse>("post", "/user");
    readonly generateToken = APIEndpoint<GenerateTokenParams, GenerateTokenResponse>("get", "/user/generateToken");
}
