import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";
import UserState from "components/auth/UserState";

const styles: StyleRules = {
    navLink: {
        color: "white",
        textDecoration: "none"
    }
};

const NOAUTH_LINKS: {[key: string]: string} = {
    "Hello!": "/"
};

const AUTH_LINKS: {[key: string]: string} = {
    "Manage Media": "/media",
    "List Notes": "/notes"
};

@withStyles(styles)
export default class Navbar extends React.Component<StyleComponentProps> {
    renderLinks = (links: {[key: string]: string}) =>
        Object.keys(links).map(label => (
            <Material.MenuItem key={label}>
                <ReactRouter.NavLink to={links[label]} className={this.props.classes.navLink}>
                    {label}
                </ReactRouter.NavLink>
            </Material.MenuItem>
        )
    );

    render() {
        return (
            <Material.AppBar position="static">
                <Material.Toolbar>
                    {this.renderLinks(NOAUTH_LINKS)}
                    {UserState.isAuthenticated && this.renderLinks(AUTH_LINKS)}
                    <div style={{ flexGrow: 1 }} />
                    {this.renderLinks(UserState.isAuthenticated
                        ? { "Log out": "/logout" }
                        : { "Log in":  "/login" }
                    )}
                </Material.Toolbar>
            </Material.AppBar>
        );
    }
}
