import { action, thunk, createStore } from "easy-peasy";
import { ChessColor } from "../Chess/ChessEnums/ChessColor";
import { ChessPieceType } from "../Chess/ChessEnums/ChessPieceType";
import { PlayResult } from "../Chess/ChessEnums/PlayResult";
import { arePositionsTheSame } from "../Chess/ChessInterfaces/Position";
import MessageHandler from "../messages/MessageHandler";
import AuthenticationMessage from "../messages/OutgoingMessages/AuthenticationMessage";
import CancelSessionMessage from "../messages/OutgoingMessages/CancelSessionMessage";
import FindChessGameMessage from "../messages/OutgoingMessages/FindChessGameMessage";
import MakeChessMoveMessage from "../messages/OutgoingMessages/MakeChessMoveMessage";
import PawnPromotionMessage from "../messages/OutgoingMessages/PawnPromotionMesage";
import StoreModel from "./model";

const url = "wss://chess-react-native.herokuapp.com";
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
	isConnected: false,
	isDuringGame: false,
	isSearchingForGame: false,
	lastPlayResult: "Success",
	isSideBarOpen: false,
	isLoggedIn: false,
	isRegistering: false,
	isLoggingIn: false,
	logInRegisterErrorMessage: "",

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
	setIsConnected: action((state, isConnected) => {
		console.log("Setting isConnected");
		state.isConnected = isConnected;
	}),
	setIsDuringGame: action((state, isDuringGame) => {
		console.log("Setting isDuringGame");
		state.isDuringGame = isDuringGame;
	}),
	setIsSearchingForGame: action((state, isSearchingForGame) => {
		console.log("Setting isSearchingForGame");
		state.isSearchingForGame = isSearchingForGame;
	}),
	setLastPlayResult: action((state, result) => {
		console.log("Setting lastPlayResult");
		state.lastPlayResult = result;
	}),
	setIsSideBarOpen: action((state, isSideBarOpen) => {
		console.log(`Setting isSideBarOpen ${isSideBarOpen}`);
		state.isSideBarOpen = isSideBarOpen;
	}),
	setIsLoggedIn: action((state, isLoggedIn) => {
		console.log("Setting isLoggedIn");
		state.isLoggedIn = isLoggedIn;
	}),
	setIsRegistering: action((state, isRegistering) => {
		console.log("Setting isRegistering");
		state.isRegistering = isRegistering;
	}),
	setIsLoggingIn: action((state, isLoggingIn) => {
		console.log("Setting isLoggingIn");
		state.isLoggingIn = isLoggingIn;
	}),
	setLogInRegisterErrorMessage: action((state, logInRegisterErrorMessage) => {
		console.log("Setting logInRegisterErrorMessage");
		state.logInRegisterErrorMessage = logInRegisterErrorMessage;
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
	promotePawn: thunk(async (actions, promotion, helpers) => {
		console.log("Promoting pawn");
		const msg = new PawnPromotionMessage(ChessPieceType[promotion]);
		const json = JSON.stringify(msg);
		helpers.getState().socket.send(json);
	}),
	makeMove: thunk(async (actions, move, helpers) => {
		console.log("Making move");
		const msg = new MakeChessMoveMessage(move);
		const json = JSON.stringify(msg);
		helpers.getState().socket.send(json);
	}),
	findGame: thunk(async (actions, _, helpers) => {
		console.log("finding game");
		actions.setIsSearchingForGame(true);
		actions.setLastPlayResult(PlayResult[PlayResult.Success]);
		actions.setIsDuringGame(false);
		const findGameMsg = new FindChessGameMessage();
		const json = JSON.stringify(findGameMsg);
		actions.setSelectedPiece(undefined);
		helpers.getState().socket.send(json);
	}),
	closeGame: thunk(async (actions, _, helpers) => {
		console.log("closing game");
		const cancelSessionMsg = new CancelSessionMessage();
		const json = JSON.stringify(cancelSessionMsg);
		actions.setSelectedPiece(undefined);
		actions.setPossibleMoves([]);
		actions.setIsDuringGame(false);
		helpers.getState().socket.send(json);
	}),
	pingServer: thunk(async (actions, _, helpers) => {
		helpers.getState().socket.send("{a:1}");
	}),
	logIn: thunk(async (actions, { name, password }, helpers) => {
		console.log("Logging in");
		const authenticationMessage = new AuthenticationMessage(false, name, password);
		const json = JSON.stringify(authenticationMessage);
		helpers.getState().socket.send(json);
	}),
	register: thunk(async (actions, { name, password }, helpers) => {
		console.log("Registering");
		const authenticationMessage = new AuthenticationMessage(true, name, password);
		const json = JSON.stringify(authenticationMessage);
		helpers.getState().socket.send(json);
	}),
});

msgHandler.storeActions = store.getActions();

//Heroku disconnects after 55 seconds of inactivity
setInterval(() => {
	store.getActions().pingServer();
}, 50000);

export default store;