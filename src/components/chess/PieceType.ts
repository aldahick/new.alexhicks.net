export enum PieceType {
    Pawn = "P",
    Knight = "N",
    Bishop = "B",
    Rook = "R",
    Queen = "Q",
    King = "K"
}

export function getNameForPieceType(type: PieceType) {
    return Object.keys(PieceType).find(k => PieceType[k as any] === type)!;
}
