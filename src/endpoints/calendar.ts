import * as db from "models";
import { APIEndpoint } from "lib";

export type CreateParams = {
    name: string;
    url: string;
};
export type CreateResponse = {
    calendar: db.Calendar;
};

export class CalendarEndpoints {
    readonly create = APIEndpoint<CreateParams, CreateResponse>("post", "/media");
}
