import * as React from "react";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";
import DirectorySelect from "../components/DirectorySelect";

const styles: StyleRules = {

};

@withStyles(styles)
export default class IndexScene extends React.Component<StyleComponentProps> {
    render() {
        return (
            <Material.Grid container justify="center">
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    <DirectorySelect
                        options={[
                            "foo/bar/baz.x",
                            "fob.z",
                            "fav/far.y"
                        ]}
                        onFileSelect={console.log}
                    />
                </Material.Grid>
            </Material.Grid>
        );
    }
}
