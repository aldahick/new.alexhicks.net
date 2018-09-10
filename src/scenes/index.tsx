import * as React from "react";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";
import _ from "lodash";
import SocialBadge from "components/SocialBadge";

const styles: StyleRules = {
    introduction: {
        textAlign: "center",
        "& > *": {
            marginBottom: "10px"
        }
    }
};

@withStyles(styles)
export class IndexScene extends React.Component<StyleComponentProps> {
    render() {
        return (
            <Material.Grid container justify="center">
                <Material.Grid item className={this.props.classes.introduction}>
                    <Material.Typography variant="display1">
                        My name is Alex Hicks.
                    </Material.Typography>
                    <Material.Typography variant="title">
                        I'm a software engineer, student, and violinist.
                    </Material.Typography>
                    <Material.Typography>
                        I've built several semi-useful tools, some of which can
                        be found on this site. Most of the rest can be found on Github.
                    </Material.Typography>
                    <Material.Typography>
                        This site's source code can be found&nbsp;
                        <a href="https://github.com/aldahick/new.alexhicks.net">here</a>
                        .
                    </Material.Typography>
                    <Material.Grid container justify="center" spacing={16}>
                        <Material.Grid item>
                            <SocialBadge
                                imageUrl="/images/logos/github.png"
                                url="https://github.com/aldahick"
                                label="@aldahick"
                            />
                        </Material.Grid>
                        <Material.Grid item>
                            <SocialBadge
                                imageUrl="/images/logos/linkedin.png"
                                url="https://linkedin.com/in/aldahick"
                                label="@aldahick"
                            />
                        </Material.Grid>
                    </Material.Grid>
                </Material.Grid>
            </Material.Grid>
        );
    }
}
