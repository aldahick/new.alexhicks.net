import axios from "axios";

const STORAGE_KEY = "auth.token";

class UserState {
    constructor(token: string) {
        this.token = token;
    }

    get isAuthenticated() {
        return this.token !== undefined;
    }

    get token() {
        return (axios.defaults.headers.Authorization || "").split(" ")[1];
    }

    set token(value: string) {
        if (!value) {
            this.deleteToken();
            return;
        }
        axios.defaults.headers.Authorization = "bearer " + value;
        sessionStorage.setItem(STORAGE_KEY, value);
    }

    deleteToken() {
        delete axios.defaults.headers.Authorization;
        sessionStorage.removeItem(STORAGE_KEY);
    }
}

const token = sessionStorage.getItem(STORAGE_KEY);
export default new UserState(token);
