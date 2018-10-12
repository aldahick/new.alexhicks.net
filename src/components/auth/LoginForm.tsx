import * as React from "react";
import * as Material from "@material-ui/core";
import * as api from "endpoints";
import UserState from "components/auth/UserState";

interface LoginFormProps {
    onSuccess(): void;
    onFailure(): void;
}

interface LoginFormState {
    username: string;
    password: string;
}

export default class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    readonly state: LoginFormState = {
        username: "",
        password: ""
    };

    onChange = (key: "username" | "password") => (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [key]: evt.target.value
        } as any);
    };

    onKeyUp = (evt: React.KeyboardEvent) => {
        if (evt.key === "Enter") {
            this.submit().catch(err => alert("Couldn't log in! " + err.message));
        }
    };

    submit = async () => {
        try {
            const res = await api.user.generateToken(this.state);
            UserState.token = res.token;
            this.props.onSuccess();
        } catch (err) {
            if (err.response.status !== 401) {
                throw err;
            }
            this.props.onFailure();
            this.setState({
                password: ""
            });
        }
    };

    render() {
        return (
            <Material.Grid container direction="column" alignItems="center">
                <Material.Grid item>
                    <Material.TextField
                        fullWidth
                        label="Username"
                        value={this.state.username}
                        onChange={this.onChange("username")}
                        onKeyUp={this.onKeyUp}
                    />
                </Material.Grid>
                <Material.Grid item>
                    <Material.TextField
                        fullWidth
                        type="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.onChange("password")}
                        onKeyUp={this.onKeyUp}
                    />
                </Material.Grid>
                <Material.Grid item>
                    <Material.Grid container justify="center">
                        <Material.Button variant="contained" onClick={this.submit}>
                            Login
                        </Material.Button>
                    </Material.Grid>
                </Material.Grid>
            </Material.Grid>
        );
    }
}
