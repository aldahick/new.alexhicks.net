export class User {
    id!: number;
    username!: string;
    passwordHash!: string;
    passwordSalt!: string;
    role!: UserRole;
    mediaItems?: MediaItem[];
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
export class MediaItem {
    id!: number;
    user!: User;
    key!: string;
    mimeType!: string;
    content!: Buffer;
    created!: Date;
}
