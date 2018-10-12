import * as React from "react";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import * as api from "endpoints";
import * as db from "models";
import DirectorySelect from "components/DirectorySelect";
import MediaItemView from "components/MediaItemView";

const styles: StyleRules = { };

interface MediaState {
    mediaItems: db.MediaItem[];
    selectedItem?: db.MediaItem;
}

@withStyles(styles)
export class MediaScene extends React.Component<StyleComponentProps, MediaState> {
    readonly state: MediaState = {
        mediaItems: [],
        selectedItem: undefined
    };

    async componentDidMount() {
        this.setState({
            mediaItems: await api.media.getMany({})
                .then(r => r.mediaItems)
        });
    }

    onItemDelete = async () => {
        await api.media.delete({ id: this.state.selectedItem.id });
        this.setState({
            selectedItem: undefined
        });
    };

    onItemSelect = async (key: string) => {
        this.setState({
            selectedItem: this.state.mediaItems.find(i => i.key === key)
        });
    };

    render() {
        return (
            <Material.Grid container justify="center">
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    {this.state.mediaItems.length === 0 || <DirectorySelect
                        options={this.state.mediaItems.map(i => i.key)}
                        onFileSelect={this.onItemSelect}
                    />}
                    {this.state.selectedItem === undefined || (
                        <div>
                            <Material.Grid container justify="center">
                                <Material.Button variant="contained">
                                    <Material.Typography>
                                        Back
                                    </Material.Typography>
                                </Material.Button>
                                <Material.IconButton color="secondary" onClick={this.onItemDelete}>
                                    <DeleteIcon />
                                </Material.IconButton>
                                <Material.Button variant="contained">
                                    <Material.Typography>
                                        Next
                                    </Material.Typography>
                                </Material.Button>
                            </Material.Grid>
                            <Material.Grid container justify="center">
                                <Material.Typography>
                                    {this.state.selectedItem.key}
                                </Material.Typography>
                            </Material.Grid>
                            <Material.Grid container justify="center">
                                <MediaItemView item={this.state.selectedItem} />
                            </Material.Grid>
                        </div>
                    )}
                </Material.Grid>
            </Material.Grid>
        );
    }
}
