import { action, computed, thunk, createStore } from "easy-peasy";
import { ChessColor } from "../Chess/ChessEnums/ChessColor";
import Position, { arePositionsTheSame } from "../Chess/ChessInterfaces/Position";
import MessageHandler from "../messages/MessageHandler";
import FindChessGameMessage from "../messages/OutgoingMessages/FindChessGameMessage";
import MakeChessMoveMessage from "../messages/OutgoingMessages/MakeChessMoveMessage";
import StoreModel from "./model";

const url = "wss://chess-react-native.herokuapp.com"



const msgHandler = new MessageHandler();

function prepareWebSocket(): WebSocket {
	console.log("prepareWebSocket");
	const socket = new WebSocket(url);
	socket.onopen = msgHandler.handleOpen;
	socket.onmessage = msgHandler.handleMessage;
	socket.onclose = msgHandler.handleClose;
	return socket;
}

const store = createStore<StoreModel>({
	socket: prepareWebSocket(),
	pieces: [],
	moves: [],
	isMyTurn: false,
	isPromotionRequired: false,
	myColor: ChessColor.White,
	selectedPiece: undefined,
	possibleMoves: [],

	isConnected: computed((store) => store.socket.readyState == WebSocket.OPEN),

	setPieces: action((state, pieces) => {
		console.log("Setting pieces");
		state.pieces = pieces;
	}),
	setMoves: action((state, moves) => {
		console.log("Setting moves");
		state.moves = moves;
	}),
	setIsMyTurn: action((state, isMyTurn) => {
		console.log("Setting isMyTurn");
		state.isMyTurn = isMyTurn;
	}),
	setIsPromotionRequired: action((state, isPromotionRequired) => {
		console.log("Setting isPromotionRequired");
		state.isPromotionRequired = isPromotionRequired;
	}),
	setMyColor: action((state, myColor) => {
		console.log("Setting myColor");
		state.myColor = myColor;
	}),
	setSelectedPiece: action((state, piece) => {
		console.log("Setting selected piece");
		state.selectedPiece = piece;
	}),
	setPossibleMoves: action((state, moves) => {
		console.log("Setting possible moves");
		state.possibleMoves = moves;
	}),

	selectPiece: thunk(async (actions, position, helpers) => {
		console.log("Selecting piece thunk");
		if (!helpers.getState().isMyTurn) {
			return;
		}
		const selectedPiece = helpers.getState().selectedPiece;
		const selectedPiecePosition = selectedPiece?.ChessPiece.Position;
		if (arePositionsTheSame(selectedPiecePosition, position)) {
			actions.setPossibleMoves([]);
			return actions.setSelectedPiece(undefined);
		}

		const possibleMove = helpers.getState().moves
			.filter(m => arePositionsTheSame(selectedPiecePosition, m.ChessMove.StartingPosition) &&
				arePositionsTheSame(position, m.ChessMove.FinishedPosition))[0]
		if (possibleMove !== undefined) {
			actions.makeMove(possibleMove);
			actions.setPossibleMoves([]);
			return actions.setSelectedPiece(undefined);
		}

		const pieceToSelect = helpers.getState().pieces
			.filter(p => arePositionsTheSame(p.ChessPiece.Position, position))[0]

		if (pieceToSelect !== undefined && pieceToSelect.ChessPiece.Color !== helpers.getState().myColor) {
			actions.setPossibleMoves([]);
			return actions.setSelectedPiece(undefined);
		}
		actions.setSelectedPiece(pieceToSelect);
		const moves = helpers.getState().moves
			.filter(m => arePositionsTheSame(m.ChessMove.StartingPosition, pieceToSelect?.ChessPiece.Position))
		actions.setPossibleMoves(moves);
	}),
	makeMove: thunk(async (actions, move, helpers) => {
		console.log("Making move");
		const msg = new MakeChessMoveMessage(move);
		const json = JSON.stringify(msg);
		helpers.getState().socket.send(json);
	}),
	findGame: thunk(async (actions, _, helpers) => {
		const findGameMsg = new FindChessGameMessage();
		const json = JSON.stringify(findGameMsg);
		console.log("finding game");
		console.log(helpers.getState().socket.readyState.toString());
		actions.setSelectedPiece(undefined);
		helpers.getState().socket.send(json);
	}),
	closeGame: thunk(async (actions, _, helpers) => {
		helpers.getState();
	}),
	pingServer: thunk(async (actions, _, helpers) => {
		helpers.getState().socket.send("{a:1}");
	}),
});

msgHandler.storeActions = store.getActions();
console.log("finished store.tsx")

//Heroku disconnects after 55 seconds of inactivity
setInterval(() => {
	store.getActions().pingServer();
}, 50000);

export default store;