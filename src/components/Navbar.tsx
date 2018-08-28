import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";

const styles: StyleRules = {
    navLink: {
        color: "white",
        textDecoration: "none"
    }
};

const NAVBAR_LINKS: {[key: string]: string} = {
    "Manage Media": "/media",
    "List Notes": "/notes"
};

@withStyles(styles)
export default class Navbar extends React.Component<StyleComponentProps> {
    render() {
        return (
            <Material.AppBar position="static">
                <Material.Toolbar>
                    {Object.keys(NAVBAR_LINKS).map(label =>
                        <Material.MenuItem key={label}>
                            <ReactRouter.NavLink to={NAVBAR_LINKS[label]} className={this.props.classes.navLink}>
                                {label}
                            </ReactRouter.NavLink>
                        </Material.MenuItem>
                    )}
                </Material.Toolbar>
            </Material.AppBar>
        );
    }
}
