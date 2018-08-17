import _ from "lodash";
import * as React from "react";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";

const styles: StyleRules = {
    tokenSeparator: {
        padding: "0 4px"
    }
};

interface DirectorySelectProps extends StyleComponentProps {
    options: string[];
    onFileSelect(path: string): void;
}

interface DirectorySelectState {
    options: string[][];
    selected: string[];
    currentToken: string;
}

@withStyles(styles)
export default class DirectorySelect extends React.Component<DirectorySelectProps, DirectorySelectState> {
    readonly state: DirectorySelectState = {
        options: this.props.options.map(o => o.split("/")),
        selected: [],
        currentToken: this.props.options[0].split("/")[0]
    };

    getSelectableOptions(selected: string[] = this.state.selected) {
        return this.state.options.filter(o =>
            o.length > selected.length &&
            _.isEqual(o.slice(0, selected.length), selected)
        );
    }

    get selectedPath() {
        return this.state.selected.concat([this.state.currentToken]).join("/");
    }

    isFileSelected() {
        return this.state.options.some(o =>
            o.join("/") === this.selectedPath
        );
    }

    /** when a token in the header is clicked */
    onReset = (index: number) => () => {
        this.setState({
            selected: this.state.selected.slice(0, index)
        });
    };

    /** when the last token (<select>) changes */
    onEndChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            currentToken: evt.target.value.split("/").slice(-1)[0]
        });
    };

    /** when the next layer is opened */
    onNextList = () => {
        if (this.isFileSelected()) return this.props.onFileSelect(this.selectedPath);
        const selected = this.state.selected.concat([this.state.currentToken]);
        this.setState({
            selected,
            currentToken: this.getSelectableOptions(selected)[0][selected.length]
        });
    };

    render() {
        return (
            <Material.Grid container justify="center">
                <Material.Grid container justify="center">
                    <Material.Typography variant="subheading">
                        {this.state.selected.map((token, index) =>
                            <span key={token}>
                                <span onClick={this.onReset(index)}>
                                    {token}
                                </span>
                                <span className={this.props.classes.tokenSeparator}>/</span>
                            </span>
                        )}
                        <span>
                            {this.state.currentToken}
                        </span>
                    </Material.Typography>
                </Material.Grid>
                <Material.Grid item xs={8} sm={6} md={4}>
                    <Material.Select
                        fullWidth
                        onChange={this.onEndChange}
                        value={this.state.currentToken}
                    >
                        {this.getSelectableOptions().map(o =>
                            o[this.state.selected.length]
                        ).map(option =>
                            <Material.MenuItem value={option} key={option}>
                                {option}
                            </Material.MenuItem>
                        )}
                    </Material.Select>
                </Material.Grid>
                <Material.Grid item xs={4} sm={3} md={2}>
                    <Material.Button onClick={this.onNextList} variant="outlined">
                        {this.isFileSelected() ? "Open" : "List"}
                    </Material.Button>
                </Material.Grid>
            </Material.Grid>
        );
    }
}
