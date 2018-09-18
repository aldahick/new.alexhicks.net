import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";
import axios from "axios";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import * as db from "models";

import "brace";
import AceEditor from "react-ace";
import "brace/mode/latex";
import "brace/theme/monokai";

const styles: StyleRules = {
    title: {
        "& h1,h3": {
            display: "inline-block",
            marginRight: "0.5em"
        }
    },
    renderPreview: {
        whiteSpace: "pre"
    }
};

type NoteEditProps = RouteComponentProps<{ id: string; }> & StyleComponentProps;

interface NoteEditState {
    note: db.MediaItem | undefined;
    name: string;
    body: string;
}

@withStyles(styles)
export class NoteEditScene extends React.Component<NoteEditProps, NoteEditState> {
    readonly state: NoteEditState = {
        note: undefined,
        name: "",
        body: ""
    };

    async componentDidMount() {
        const note = await axios.get("/media/" + this.props.match.params.id)
            .then(r => r.data.mediaItem as db.MediaItem);
        this.setState({
            note,
            name: note.key.split("/").slice(1).join("/"),
            body: note.content.data.map(c => String.fromCharCode(c)).join("")
        });
    }

    onEditorChange = (body: string) => this.setState({ body });

    onNameChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({ name: evt.target.value });

    checkSavePressed = (evt: React.KeyboardEvent) => {
        if (evt.ctrlKey && evt.key === "s") {
            evt.preventDefault();
            this.submit().catch(err => {
                alert("Couldn't save: " + err.message);
                console.error(err);
            });
            return false;
        }
        return true;
    };

    checkNameSubmit = (evt: React.KeyboardEvent) => {
        if (evt.key === "Enter") {
            this.submit().catch(console.error);
        }
    };

    async submit() {
        await axios.patch("/media/" + this.state.note!.id, {
            key: "notes/" + this.state.name,
            content: this.state.body
        });
        alert("Saved!");
    }

    renderMath() {
        const tokens = this.state.body.split(/\$([^\$]+)\$/g);
        return tokens.map((token, index) =>
            index % 2 === 0 ? token :
            <InlineMath math={token} />
        );
    }

    render() {
        if (this.state.note === undefined) return null;
        return (
            <Material.Grid container justify="center">
                <Material.Grid item xs={12} md={8}>
                    <div className={this.props.classes!.title}>
                        <Material.Typography variant="display1">
                            Edit Note
                        </Material.Typography>
                        <Material.Typography variant="subheading">
                            Name:&nbsp;
                            <Material.TextField
                                placeholder="Name"
                                onChange={this.onNameChange}
                                onKeyDown={this.checkNameSubmit}
                                value={this.state.name}
                            />
                        </Material.Typography>
                    </div>
                    <Material.Grid container>
                        <Material.Grid item xs={6} onKeyDown={this.checkSavePressed}>
                            <AceEditor
                                theme="monokai"
                                mode="latex"
                                wrapEnabled={true}
                                fontSize={14}
                                onChange={this.onEditorChange}
                                value={this.state.body}
                                style={{width: "100%"}}
                                editorProps={{ $blockScrolling: Infinity }}
                            />
                        </Material.Grid>
                        <Material.Grid item xs={6} className={this.props.classes!.renderPreview}>
                            {this.renderMath()}
                        </Material.Grid>
                    </Material.Grid>
                </Material.Grid>
            </Material.Grid>
        );
    }
}
