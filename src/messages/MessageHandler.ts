import { Actions } from "easy-peasy";
import { ChessColor } from "../Chess/ChessEnums/ChessColor";
import StoreModel from "../store/model";
import AuthenticationResultMessage, {
	isAuthenticationResultMessage,
} from "./IncomingMessages/AuthenticationResultMessage";
import ChessPiecesAndMovesMessage, {
	isChessPiecesAndMovesMessage,
} from "./IncomingMessages/ChessPiecesAndMovesMessage";
import ChessPlayResultMessage, {
	isChessPlayResultMessage,
} from "./IncomingMessages/ChessPlayResultMessage";
import GameFoundMessage, {
	isGameFoundMessage,
} from "./IncomingMessages/GameFoundMessage";
import InvalidStateMessage, {
	isInvalidStateMessage,
} from "./IncomingMessages/InvalidStateMessage";
import SessionClosedMessage, {
	isSessionClosedMessage,
} from "./IncomingMessages/SessionClosedMessage";

export default class MessageHandler {
	storeActions: Actions<StoreModel> | null = null;

	handleOpen = (event: Event) => {
		console.log("socket connection established!");
		if (this.storeActions !== null) {
			return this.storeActions?.setIsConnected(true);
		}
		setTimeout(() => this.storeActions?.setIsConnected(true), 100);
	};

	handleClose = (event: CloseEvent) => {
		console.log("SOCKET CONNECTION CLOSED!");
		this.storeActions?.setIsConnected(false);
		this.storeActions?.setIsDuringGame(false);
	};

	handleMessage = (event: MessageEvent) => {
		const msg = JSON.parse(event.data);
		console.log(msg);
		if (isGameFoundMessage(msg)) {
			return this.handleGameFoundMessage(msg);
		}
		if (isInvalidStateMessage(msg)) {
			return this.handleInvalidStateMessage(msg);
		}
		if (isChessPlayResultMessage(msg)) {
			return this.handleChessPlayResultMessage(msg);
		}
		if (isChessPiecesAndMovesMessage(msg)) {
			return this.handleChessPiecesAndMovesMessage(msg);
		}
		if (isSessionClosedMessage(msg)) {
			return this.handleSessionClosedMessage(msg);
		}
		if (isAuthenticationResultMessage(msg)) {
			return this.handleAuthenticationResultMessage(msg);
		}
		console.log("this is UNKNOWN message");
	};

	private handleGameFoundMessage = (msg: GameFoundMessage) => {
		console.log("this is GameFoundMessage");

		this.storeActions?.setIsMyTurn(msg.IsClientTurn);
		const myColor = msg.IsClientTurn ? ChessColor.White : ChessColor.Black;
		this.storeActions?.setMyColor(myColor);
		this.storeActions?.setIsDuringGame(true);
		this.storeActions?.setIsSearchingForGame(false);
	};

	private handleInvalidStateMessage = (msg: InvalidStateMessage) => {
		console.log("this is InvalidStateMessage");
		console.log(msg.Message);
	};

	private handleChessPlayResultMessage = (msg: ChessPlayResultMessage) => {
		console.log("this is ChessPlayResultMessage");
		console.log(msg.Message);
		if (msg.Message === "Error") {
			return;
		}
		this.storeActions?.setLastPlayResult(msg.Message);
		this.storeActions?.setIsMyTurn(msg.IsClientTurn);
		this.storeActions?.setIsPromotionRequired(msg.IsPromotionRequired);
	};

	private handleChessPiecesAndMovesMessage = (
		msg: ChessPiecesAndMovesMessage
	) => {
		console.log("this is ChessPiecesAndMovesMessage");

		this.storeActions?.setMoves(msg.AvailableMoves);
		this.storeActions?.setPieces(msg.Pieces);
	};

	private handleSessionClosedMessage = (msg: SessionClosedMessage) => {
		console.log("this is SessionClosedMessage");

		console.log(msg.Reason);
		this.storeActions?.setLastPlayResult(msg.Reason);
		this.storeActions?.setMoves([]);
		this.storeActions?.setPieces([]);
		this.storeActions?.setIsMyTurn(false);
	};

	private handleAuthenticationResultMessage = (
		msg: AuthenticationResultMessage
	) => {
		console.log("this is AuthenticationResultMessage");
		console.log(msg.ErrorMessage);

		if (msg.IsSuccess) {
			this.storeActions?.setIsLoggedIn(true);
		}
	};
}
