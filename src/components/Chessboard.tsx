import * as React from "react";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";
import _ from "lodash";
import * as chess from "./chess";

const styles: StyleRules = {
    slot: {
        width: "64px",
        height: "64px",
        "&[data-shade='dark']": {
            backgroundColor: "maroon"
        },
        "&[data-shade='light']": {
            backgroundColor: "tan"
        }
    }
};

interface ChessboardProps extends StyleComponentProps {
    fen: string;
    onMove(from: string, to: string): void;
    slotSize?: number;
}

interface ChessboardState {
    pieces: chess.PieceData[];
}

@withStyles(styles)
export default class Chessboard extends React.Component<ChessboardProps, ChessboardState> {
    constructor(props: ChessboardProps) {
        super(props);
        this.state = { pieces: [] };
    }

    static getDerivedStateFromProps(props: ChessboardProps): ChessboardState {
        const pieces = chess.parseFEN(props.fen);
        return {
            pieces
        };
    }

    onMove = (piece: chess.PieceData) => (x: number, y: number) => {
        const oldSan = chess.Piece.getSAN(piece);
        piece.x = x;
        piece.y = y;
        this.setState({ pieces: this.state.pieces });
        this.props.onMove(oldSan, chess.Piece.getSAN(piece));
    };

    renderPiece = (x: number, y: number) => {
        const piece = this.state.pieces.find(p => p.x === x && p.y === y);
        if (!piece) return "";
        return <chess.Piece piece={piece} onMove={this.onMove(piece)} forceNormalPosition={this.props.fen.endsWith(".")} />;
    };

    render() {
        return (
            <div>
                {_.range(8).reverse().map(y =>
                    <Material.Grid container key={y}>
                        {_.range(8).map(x => (
                            <Material.Grid item key={x} className={this.props.classes!.slot} data-shade={(x + y) % 2 === 0 ? "light" : "dark"}>
                                {this.renderPiece(x + 1, y + 1)}
                            </Material.Grid>
                        ))}
                    </Material.Grid>
                )}
            </div>
        );
    }
}
