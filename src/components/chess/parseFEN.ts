import { PieceColor } from "./PieceColor";
import { PieceData } from "./PieceData";

export function parseFEN(fen: string): PieceData[] {
    const rows = fen.split(" ")[0].split("/").map(r => r.split(""));
    const pieces: PieceData[] = [];
    rows.forEach((row, y) => {
        let x = 1;
        for (const pieceType of row) {
            if (isNaN(Number(pieceType))) {
                pieces.push({
                    type: pieceType.toUpperCase() as any,
                    color: pieceType.toUpperCase() === pieceType
                        ? PieceColor.White
                        : PieceColor.Black,
                    x: x++,
                    y: 8 - y
                });
            } else {
                x += Number(pieceType);
            }
        }
    });
    console.log(pieces);
    return pieces;
}
