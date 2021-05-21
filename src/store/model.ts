import { Action, Thunk, Computed } from "easy-peasy";
import { ChessColor } from "../Chess/ChessEnums/ChessColor";
import ChessMoveWrapper from "../Chess/ChessInterfaces/ChessMoveWrapper";
import ChessPieceWrapper from "../Chess/ChessInterfaces/ChessPieceWrapper";
import Position from "../Chess/ChessInterfaces/Position";

export default interface StoreModel {
	socket: WebSocket;
	pieces: ChessPieceWrapper[];
	moves: ChessMoveWrapper[];
	isMyTurn: boolean;
	isPromotionRequired: boolean;
	myColor: ChessColor;
	selectedPiece: ChessPieceWrapper | undefined;
	possibleMoves: ChessMoveWrapper[];

	isConnected: Computed<StoreModel, boolean>;

	setPieces: Action<StoreModel, ChessPieceWrapper[]>;
	setMoves: Action<StoreModel, ChessMoveWrapper[]>;
	setIsMyTurn: Action<StoreModel, boolean>;
	setIsPromotionRequired: Action<StoreModel, boolean>;
	setMyColor: Action<StoreModel, ChessColor>;
	setSelectedPiece: Action<StoreModel, ChessPieceWrapper | undefined>;
	setPossibleMoves: Action<StoreModel, ChessMoveWrapper[]>;

	selectPiece: Thunk<StoreModel, Position>;
	makeMove: Thunk<StoreModel, ChessMoveWrapper>;
	findGame: Thunk<StoreModel>;
	closeGame: Thunk<StoreModel>;
	pingServer: Thunk<StoreModel>;
}
