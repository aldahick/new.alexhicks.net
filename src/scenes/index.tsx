import * as React from "react";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";
import _ from "lodash";
import { MyNameIs } from "data/Phrases";

const styles: StyleRules = {
    introduction: {
        textAlign: "center"
    }
};

@withStyles(styles)
export class IndexScene extends React.Component<StyleComponentProps> {
    render() {
        return (
            <Material.Grid container justify="center">
                <Material.Grid item className={this.props.classes.introduction}>
                    <Material.Typography variant="display1">
                        <i>{MyNameIs[_.random(MyNameIs.length - 1)]}</i>&nbsp;
                        Alex Hicks
                    </Material.Typography>
                    <Material.Typography variant="title">
                        I'm a software engineer, student, and violinist.
                    </Material.Typography>
                    <Material.Typography>
                        I've built several semi-useful tools, some of which can
                        be found on this site. Most of the rest can be found on my&nbsp;
                        <a href="https://github.com/aldahick">GitHub profile</a>.
                    </Material.Typography>
                </Material.Grid>
            </Material.Grid>
        );
    }
}
