import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";
import * as api from "endpoints";
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
    "Notes": "/notes",
};

type NavbarProps = ReactRouter.RouteComponentProps<{}> &
    StyleComponentProps &
    ReactRouter.BrowserRouterProps;

interface NavbarState {
    isRegistrationAllowed: boolean;
}

@withStyles(styles)
class Navbar extends React.Component<NavbarProps, NavbarState> {
    readonly state: NavbarState = {
        isRegistrationAllowed: false
    };

    async componentDidMount() {
        this.setState({
            isRegistrationAllowed: await api.user.canRegister()
                .then(r => r.canRegister)
        });
    }

    onNavigate = (redirectTo: string) => () =>
        this.props.history.push(redirectTo);

    renderLinks = (links: {[key: string]: string}) =>
        Object.keys(links).map(label => (
            <Material.MenuItem key={label} onClick={this.onNavigate(links[label])}>
                <ReactRouter.Link to={links[label]} className={this.props.classes.navLink}>
                    {label}
                </ReactRouter.Link>
            </Material.MenuItem>
        )
    );

    getLoginLinks() {
        if (UserState.isAuthenticated) {
            return { "Log out": "/logout" };
        }
        const links: {[key: string]: string} = {
            "Log in": "/login"
        };
        if (this.state.isRegistrationAllowed) {
            links.Register = "/register";
        }
        return links;
    }

    render() {
        return (
            <Material.AppBar position="static">
                <Material.Toolbar>
                    {this.renderLinks(NOAUTH_LINKS)}
                    {UserState.isAuthenticated && this.renderLinks(AUTH_LINKS)}
                    <div style={{ flexGrow: 1 }} />
                    {this.renderLinks(this.getLoginLinks())}
                </Material.Toolbar>
            </Material.AppBar>
        );
    }
}

export default ReactRouter.withRouter(Navbar);
