import * as React from "react";
import Draggable, { DraggableData } from "react-draggable";
import { PieceColor } from "./PieceColor";
import { PieceData } from "./PieceData";
import { getNameForPieceType } from "./PieceType";

interface PieceProps {
    forceNormalPosition: boolean;
    piece: PieceData;
    onMove(x: number, y: number): void;
}

export class Piece extends React.Component<PieceProps> {
    onDragStop = (_: Event, data: DraggableData) => {
        this.props.onMove(
            Math.floor(this.props.piece.x + (data.lastX / 64)),
            Math.floor(this.props.piece.y - (data.lastY / 64))
        );
    };

    get imageUrl() {
        const { piece } = this.props;
        const pieceName = getNameForPieceType(piece.type).toLowerCase();
        const color = PieceColor[piece.color].toLowerCase();
        return (process.env.REACT_APP_BASE_URL || "") + `/images/chess/pieces/${pieceName}/${color}.svg`;
    }

    render() {
        return (
            <Draggable grid={[64, 64]} onStop={this.onDragStop} position={this.props.forceNormalPosition ? {x: 0, y: 0} : undefined}>
                <div>
                    <img src={this.imageUrl} width="64px" draggable={false} />
                </div>
            </Draggable>
        );
    }

    static getSAN(piece: PieceData) {
        return String.fromCharCode(96 + piece.x) + piece.y;
    }
}
