import { ChessPieceType } from "../ChessEnums/ChessPieceType";
import Position, { isPosition } from "./Position";

export default interface ChessMoveWrapper {
	ChessMove: {
		StartingPosition: Position;
		FinishedPosition: Position;
		IsCapture: boolean;
		PawnPromotion: ChessPieceType;
	};
}

export function isChessMoveWrapper(obj: any): obj is ChessMoveWrapper {
	return (
		obj !== null &&
		typeof obj === "object" &&
		obj.ChessMove !== null &&
		typeof obj.ChessMove === "object" &&
		isPosition(obj.ChessMove.StartingPosition) &&
		isPosition(obj.ChessMove.FinishedPosition) &&
		typeof obj.ChessMove.IsCapture === "boolean" &&
		typeof obj.ChessMove.PawnPromotion === "number" &&
		Object.values(ChessPieceType).includes(obj.ChessMove.PawnPromotion)
	);
}
