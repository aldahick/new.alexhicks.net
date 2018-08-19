import _ from "lodash";
import * as React from "react";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";

const styles: StyleRules = {
    heading: {
        "& span": {
            fontFamily: "Courier, monospace",
        }
    },
    tokenSeparator: {
        padding: "0 4px"
    },
};

interface DirectorySelectProps extends StyleComponentProps {
    options: string[];
    onFileSelect(path: string): void;
}

interface DirectorySelectState {
    selected: string[];
    currentToken?: string;
}

@withStyles(styles)
export default class DirectorySelect extends React.Component<DirectorySelectProps, DirectorySelectState> {
    readonly state: DirectorySelectState = {
        currentToken: (this.options[0] || [""])[0],
        selected: []
    };

    get options() {
        return this.props.options.map(o => o.split("/"));
    }

    getSelectableOptions(selected: string[] = this.state.selected) {
        return this.options.filter(o =>
            o.length > selected.length &&
            _.isEqual(o.slice(0, selected.length), selected)
        );
    }

    get selectedPath() {
        return this.state.selected.concat([this.state.currentToken]).join("/");
    }

    isFileSelected() {
        return this.props.options.includes(this.selectedPath);
    }

    /** when a token in the header is clicked */
    onReset = (index: number) => () => {
        if (index === this.state.selected.length) return;
        this.setState({
            selected: this.state.selected.slice(0, index),
            currentToken: this.state.selected[index] || ""
        });
    };

    /** when the last token (<select>) changes */
    onEndChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            currentToken: evt.target.value.split("/").slice(-1)[0],
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
            <div>
                <Material.Grid container justify="center">
                    <Material.Grid item xs={12} sm={9} md={6}>
                        <Material.Typography className={this.props.classes.heading}>
                            {this.state.selected.map((token, index) =>
                                <span key={token}>
                                    <span onClick={this.onReset(index)} style={{ cursor: "pointer" }}>
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
                </Material.Grid>
                <Material.Grid container justify="center">
                    <Material.Grid item xs={8} sm={6} md={4}>
                        <Material.Select
                            fullWidth
                            onChange={this.onEndChange}
                            value={this.state.currentToken}
                        >
                            {_.uniq(this.getSelectableOptions().map(o =>
                                o[this.state.selected.length]
                            )).map(option =>
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
            </div>
        );
    }
}
