import { UnauthorizedError } from "endpoints/errors";

export type Params = {
    username: string;
    password: string;
};

export type Response = UnauthorizedError | {
    token: string;
};
