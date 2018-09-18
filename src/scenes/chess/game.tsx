import * as React from "react";
import * as Material from "@material-ui/core";
import Chessboard, { Piece as ChessPiece } from "react-chess";

export class ChessGameScene extends React.Component {
    onPieceMove = (piece: ChessPiece, from: string, to: string) => {
        console.log(piece, from, to);
    };

    render() {
        return (
            <Material.Grid container justify="center">
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    <Chessboard
                        onMovePiece={this.onPieceMove}
                    />
                </Material.Grid>
            </Material.Grid>
        );
    }
}
