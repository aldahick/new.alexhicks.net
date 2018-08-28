import * as React from "react";
import * as ReactRouter from "react-router-dom";
import UserState from "components/auth/UserState";

export const LogoutScene: React.StatelessComponent = () => {
    UserState.deleteToken();
    return <ReactRouter.Redirect to="/" />;
};
