import ChessPieceWrapper, {
	isChessPieceWrapper,
} from "../../Chess/ChessInterfaces/ChessPieceWrapper";
import ChessMoveWrapper, {
	isChessMoveWrapper,
} from "../../Chess/ChessInterfaces/ChessMoveWrapper";

export default interface ChessPiecesAndMovesMessage {
	Pieces: ChessPieceWrapper[];
	AvailableMoves: ChessMoveWrapper[];
}
export function isChessPiecesAndMovesMessage(
	obj: any
): obj is ChessPiecesAndMovesMessage {
	return (
		obj !== null &&
		typeof obj === "object" &&
		Array.isArray(obj.Pieces) &&
		Array.isArray(obj.AvailableMoves) &&
		obj.Pieces.every((p: any) => isChessPieceWrapper(p)) &&
		obj.AvailableMoves.every((p: any) => isChessMoveWrapper(p))
	);
}
