import { ChessColor } from "../ChessEnums/ChessColor";
import { ChessPieceType } from "../ChessEnums/ChessPieceType";
import Position, { isPosition } from "./Position";

export default interface ChessPieceWrapper {
	ChessPiece: {
		PieceType: ChessPieceType;
		Color: ChessColor;
		Position: Position;
		HasMoved: boolean;
	};
}

export function isChessPieceWrapper(obj: any): obj is ChessPieceWrapper {
	return (
		obj !== null &&
		typeof obj === "object" &&
		obj.ChessPiece !== null &&
		typeof obj.ChessPiece === "object" &&
		Object.values(ChessPieceType).includes(obj.ChessPiece.PieceType) &&
		Object.values(ChessColor).includes(obj.ChessPiece.Color) &&
		isPosition(obj.ChessPiece.Position) &&
		typeof obj.ChessPiece.HasMoved === "boolean"
	);
}
