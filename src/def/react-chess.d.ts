declare module "react-chess" {
    import * as React from "react";
    export type Piece = {
        notation: string;
        name: string;
        position: string;
        index: number;
    };
    export type ChessProps = {
        onMovePiece(piece: Piece, fromSquare: string, toSquare: string): void;
        allowMoves?: boolean;
        highlightTarget?: boolean;
        drawLabels?: boolean;
        lightSquareColor?: string;
        darkSquareColor?: string;
        pieces?: string[];
        onDragStart?(piece: Piece, fromSquare: string): boolean;
        onSelectPiece?(piece: Piece);
    };
    export default class Chess extends React.Component<ChessProps> {
        static getDefaultLineup(): string[];
    }
}
