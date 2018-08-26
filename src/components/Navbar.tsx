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

@withStyles(styles)
export default class Navbar extends React.Component<StyleComponentProps> {
    render() {
        return (
            <Material.AppBar position="static">
                <Material.Toolbar>
                    <Material.MenuItem>
                        <ReactRouter.NavLink to="/media" className={this.props.classes.navLink}>
                            Manage Media
                        </ReactRouter.NavLink>
                    </Material.MenuItem>
                </Material.Toolbar>
            </Material.AppBar>
        );
    }
}
