import * as React from "react";
import MediaItemList from "components/MediaItemList";

export const NotesListScene: React.StatelessComponent = () => (
    <MediaItemList
        filter={i => i.mimeType === "text/x-note"}
        link={i => `/note/${i.id}`}
        create={() => ({
            key: "notes/" + new Date().toLocaleString(),
            mimeType: "text/x-note"
        })}
    />
);
