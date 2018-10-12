export class User {
    id!: number;
    username!: string;
    passwordHash!: string;
    passwordSalt!: string;
    role!: UserRole;
    calendars?: Calendar[];
    mediaItems?: MediaItem[];
    slackUsers?: SlackUser[];
    tokens?: UserToken[];
}
export enum UserRole {
    None,
    User,
    Admin
}
export class UserToken {
    constructor(init?: Partial<UserToken>) {
        Object.assign(this, init);
    }
    id!: number;
    user!: User;
    token!: string;
    created!: Date;
    expires!: Date;
    updateExpiration() {
        // set expiration to "1 day after creation"
        this.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
}
export class Calendar {
    constructor(init?: Partial<Calendar>) {
        Object.assign(this, init);
    }
    id!: number;
    user!: User;
    name!: string;
    url!: string;
    events?: CalendarEvent[];
}
export class CalendarEvent {
    constructor(init?: Partial<CalendarEvent>) {
        Object.assign(this, init);
    }
    id!: number;
    calendar!: Calendar;
    label!: string;
    start!: Date;
    end!: Date;
}
export class MediaItem {
    id!: number;
    user!: User;
    key!: string;
    mimeType!: string;
    content!: Buffer;
    created!: Date;
}
export class SlackUser {
    id!: number;
    user!: User;
    name!: string;
    token!: string;
    calendars?: SlackUserCalendar[];
}
export class SlackUserCalendar {
    constructor(init?: Partial<SlackUserCalendar>) {
        Object.assign(this, init);
    }
    id!: number;
    user!: SlackUser;
    calendar!: Calendar;
    /**
     * Status to set when calendar has an event
     */
    statusText!: string;
    /**
     * Emoji to associate with statusText
     */
    statusEmoji?: string;
}
