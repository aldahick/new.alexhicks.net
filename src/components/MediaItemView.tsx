import * as React from "react";
import * as api from "endpoints";
import * as db from "models";

interface MediaItemViewProps {
    item: db.MediaItem;
}

interface MediaItemViewState {
    content: string;
}

export default class MediaItemView extends React.Component<MediaItemViewProps, MediaItemViewState> {
    readonly state: MediaItemViewState = {
        content: ""
    };

    get url() { return `/media/${this.props.item.id}/content`; }

    async componentDidMount() {
        const content = await api.media.getContent({
            id: this.props.item.id
        });
        this.setState({
            content: typeof(content) === "string" ? content : await this.blobToBase64(content)
        });
    }

    private blobToBase64(blob: Blob): Promise<string> {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                resolve(reader.result.toString());
            };
            reader.onerror = err => {
                reject(err);
            };
        });
    }

    render() {
        switch (this.props.item.mimeType) {
            case "text/plain":
                return <div style={{ whiteSpace: "pre-wrap" }}>{this.state.content}</div>;
            case "text/html":
                return <div dangerouslySetInnerHTML={{ __html: this.state.content }} />;
            case "image/png":
            case "image/jpeg":
                return <img onError={() => { }} src={this.state.content} />;
            case "audio/mpeg":
                return <audio src={this.url} controls autoPlay />;
            case "video/mpeg":
            case "video/webm":
                return <video src={this.url} controls autoPlay style={{ width: "100%" }} />;
            default:
                return <span>Can't handle MIME type {this.props.item.mimeType}</span>;
        }
    }
}
