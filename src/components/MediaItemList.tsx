import * as React from "react";
import * as api from "endpoints";
import { CreateParams } from "endpoints/media";
import * as db from "models";
import ItemList from "components/ItemList";

type MediaItemListProps = {
    filter(item: db.MediaItem): boolean;
    link(item: db.MediaItem): string;
    create?(): CreateParams;
    prefixCount?: number;
};

export default class MediaItemList extends React.Component<MediaItemListProps> {
    fetch = () => api.media.getMany({
        dir: "notes"
    }).then(r => r.mediaItems
        .filter(this.props.filter)
        .map(i => ({ ...i, created: new Date(i.created) }))
    );

    create = () => api.media.create(this.props.create())
        .then(r => r.mediaItem);

    sort = (a: db.MediaItem, b: db.MediaItem) =>
        b.created.getTime() - a.created.getTime();

    columns = (item: db.MediaItem) => ({
        "Name": item.key.split("/").slice(this.props.prefixCount || 0).join("/"),
        "Created": item.created.toLocaleString()
    });

    render() {
        return (
            <ItemList
                fetch={this.fetch}
                create={this.create}
                link={this.props.link}
                sort={this.sort}
                columns={this.columns}
            />
        );
    }
}
