import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as Material from "@material-ui/core";
import LoginForm from "components/auth/LoginForm";
import UserState from "components/auth/UserState";

interface LoginState {
    shouldRedirect: boolean;
    errorMessage: string;
}

export class LoginScene extends React.Component<ReactRouter.RouteComponentProps<object>, LoginState> {
    readonly state = {
        shouldRedirect: UserState.isAuthenticated,
        errorMessage: ""
    };

    onSuccess = () => {
        this.setState({ shouldRedirect: true });
    };

    onFailure = () => {
        this.setState({ errorMessage: "Invalid username or password!" });
    };

    render() {
        if (this.state.shouldRedirect) {
            return (
                <ReactRouter.Redirect to={(this.props.location.state || { from: "/" }).from} />
            );
        } else {
            return (
                <Material.Grid container justify="center">
                    <Material.Grid item xs={12} sm={9} md={6} lg={4}>
                        <Material.Typography color="secondary" variant="subheading" style={{textAlign: "center"}}>
                            {this.state.errorMessage}
                        </Material.Typography>
                        <LoginForm
                            onSuccess={this.onSuccess}
                            onFailure={this.onFailure}
                        />
                    </Material.Grid>
                </Material.Grid>
            );
        }
    }
}
