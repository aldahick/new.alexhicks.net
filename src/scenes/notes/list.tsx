import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as Material from "@material-ui/core";
import axios from "axios";
import * as db from "models";
import ItemsTable from "components/ItemsTable";

interface NotesListState {
    notes: db.MediaItem[];
    createdId: number | undefined;
}

export class NotesListScene extends React.Component<object, NotesListState> {
    readonly state: NotesListState = {
        notes: [],
        createdId: undefined
    };

    async componentDidMount() {
        this.setState({
            notes: await axios.get("/media", {
                params: { dir: "notes" }
            }).then(r => (r.data.mediaItems as db.MediaItem[])
                .filter(i => i.mimeType === "text/plain"))
        });
    }

    onCreate = async () => {
        const { id } = await axios.post("/media", {
            key: "notes/" + new Date().toLocaleString()
        }).then(r => r.data.mediaItem as db.MediaItem);
        this.setState({ createdId: id });
    };

    render() {
        if (this.state.createdId !== undefined) {
            return (
                <ReactRouter.Redirect to={"/note/" + this.state.createdId} />
            );
        }
        return (
            <Material.Grid container justify="center">
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    <Material.Button onClick={this.onCreate}>
                        <Material.Typography>Create</Material.Typography>
                    </Material.Button>
                    <ItemsTable
                        items={this.state.notes.map(note => ({
                            "ID": note.id.toString(),
                            "Name": <ReactRouter.NavLink to={"/note/" + note.id}>
                                {note.key.split("/").slice(1).join("/")}
                            </ReactRouter.NavLink>,
                            "Created": new Date(note.created).toLocaleDateString()
                        }))}
                    />
                </Material.Grid>
            </Material.Grid>
        );
    }
}
