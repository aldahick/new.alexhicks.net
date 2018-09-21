export enum PieceColor {
    White,
    Black
}

export function getColorFromAPI(color: "b" | "w") {
    return color === "w" ? PieceColor.White : PieceColor.Black;
}
