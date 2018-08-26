import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as Material from "@material-ui/core";
import axios from "axios";
import * as GenerateToken from "endpoints/user/generateToken";
import UserState from "components/auth/UserState";

interface LoginState {
    username: string;
    password: string;
    shouldRedirect: boolean;
}

export class LoginScene extends React.Component<ReactRouter.RouteComponentProps<object>, LoginState> {
    readonly state = {
        username: "",
        password: "",
        shouldRedirect: UserState.isAuthenticated
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
        const res = await axios.get("/user/generateToken", {
            params: this.state as GenerateToken.Params
        }).then(res => res.data as GenerateToken.Response);
        if ("statusCode" in res) {
            alert("Incorrect username or password!");
            return this.setState({
                username: "",
                password: ""
            });
        }
        UserState.token = res.token;
        this.setState({ shouldRedirect: true });
    };

    render() {
        if (this.state.shouldRedirect) {
            return (
                <ReactRouter.Redirect to={this.props.location.state.from} />
            );
        }
        return (
            <Material.Grid container direction="column" alignItems="center">
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    <Material.TextField
                        fullWidth
                        label="Username"
                        value={this.state.username}
                        onChange={this.onChange("username")}
                        onKeyUp={this.onKeyUp}
                    />
                </Material.Grid>
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    <Material.TextField
                        fullWidth
                        type="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.onChange("password")}
                        onKeyUp={this.onKeyUp}
                    />
                </Material.Grid>
                <Material.Grid item xs={3}>
                    <Material.Grid container>
                        <Material.Button variant="contained" onClick={this.submit}>
                            Login
                        </Material.Button>
                    </Material.Grid>
                </Material.Grid>
            </Material.Grid>
        );
    }
}
