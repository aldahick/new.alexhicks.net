import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as Material from "@material-ui/core";
import * as api from "endpoints";
import * as db from "models";
import { ArgumentTypes } from "lib";
import ItemsTable from "components/ItemsTable";

type MediaItemListProps = {
    filter(item: db.MediaItem): boolean;
    link(item: db.MediaItem): string;
    create?(): ArgumentTypes<(typeof api)["media"]["create"]>[0]
};

type MediaItemListState = {
    items: db.MediaItem[];
    created: db.MediaItem;
};

export default class MediaItemList extends React.Component<MediaItemListProps, MediaItemListState> {
    readonly state: MediaItemListState = {
        items: [],
        created: undefined
    };

    async componentDidMount() {
        this.setState({
            items: await api.media.getMany({
                dir: "notes"
            }).then(r => r.mediaItems
                .filter(this.props.filter)
                .map(i => ({ ...i, created: new Date(i.created) }))
            )
        });
    }

    onCreate = async () => {
        const item = await api.media.create(this.props.create())
            .then(r => r.mediaItem);
        this.setState({
            created: item,
            items: this.state.items.concat([item])
        });
    };

    render() {
        if (this.state.created !== undefined) {
            return (
                <ReactRouter.Redirect to={this.props.link(this.state.created)} />
            );
        }
        return (
            <Material.Grid container justify="center">
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    <Material.Button onClick={this.onCreate}>
                        <Material.Typography>Create</Material.Typography>
                    </Material.Button>
                    <ItemsTable
                        items={this.state.items.sort((a, b) =>
                            b.created.getTime() - a.created.getTime()
                        ).map(item => ({
                            "ID": item.id.toString(),
                            "Name": <ReactRouter.NavLink to={this.props.link(item)}>
                                {item.key.split("/").slice(1).join("/")}
                            </ReactRouter.NavLink>,
                            "Created": new Date(item.created).toLocaleDateString()
                        }))}
                    />
                </Material.Grid>
            </Material.Grid>
        );
    }
}
