import ChessMoveWrapper from "../../Chess/ChessInterfaces/ChessMoveWrapper";

export default class MakeChessMoveMessage {
	X_StartPosition: number;
	Y_StartPosition: number;
	X_FinishedPosition: number;
	Y_FinishedPosition: number;

	constructor(chessMoveWrapper: ChessMoveWrapper) {
		this.X_StartPosition = chessMoveWrapper.ChessMove.StartingPosition.X;
		this.Y_StartPosition = chessMoveWrapper.ChessMove.StartingPosition.Y;
		this.X_FinishedPosition = chessMoveWrapper.ChessMove.FinishedPosition.X;
		this.Y_FinishedPosition = chessMoveWrapper.ChessMove.FinishedPosition.Y;
	}
}
