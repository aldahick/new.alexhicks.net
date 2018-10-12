import * as db from "models";
import { APIEndpoint } from "lib";

export type CreateParams = {
    name: string;
    token: string;
};
export type CreateResponse = {
    slackUser: db.SlackUser;
};

export type AttachCalendarParams = {
    id: number;
    calendarId: number;
    statusText: string;
    statusEmoji?: string;
};
export type AttachCalendarResponse = {
    ok: true;
};

export class SlackUserEndpoints {
    readonly attachCalendar = APIEndpoint<AttachCalendarParams, AttachCalendarResponse>("post", ":id/attach/:calendarId");
    readonly create = APIEndpoint<CreateParams, CreateResponse>("post", "/media");
}
