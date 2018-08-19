import * as React from "react";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";

const styles: StyleRules = {

};

@withStyles(styles)
export default class IndexScene extends React.Component<StyleComponentProps> {
    render() {
        return (
            "Hello!"
        );
    }
}
