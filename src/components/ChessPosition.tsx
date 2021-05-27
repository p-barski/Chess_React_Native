import React from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { useStoreState, useStoreActions } from "../store/hooks"
import ChessPieceWrapper from "../Chess/ChessInterfaces/ChessPieceWrapper";
import { ChessPieceType } from "../Chess/ChessEnums/ChessPieceType";
import Position, { arePositionsTheSame } from "../Chess/ChessInterfaces/Position";
import { ChessColor } from "../Chess/ChessEnums/ChessColor";

const ChessLookup = (piece: ChessPieceWrapper | undefined): string => {
	const type = piece?.ChessPiece.PieceType;
	switch (type) {
		case ChessPieceType.King:
			return "♚";
		case ChessPieceType.Queen:
			return "♛";
		case ChessPieceType.Rook:
			return "♜";
		case ChessPieceType.Bishop:
			return "♝";
		case ChessPieceType.Knight:
			return "♞";
		case ChessPieceType.Pawn:
			return "♟︎";
	}
	return ""
}


interface Props {
	isWhite: boolean,
	piece: ChessPieceWrapper | undefined,
	position: Position,
}

const ChessPosition = (props: Props) => {
	const colorStyle = props.isWhite ? styles.white : styles.black;
	const textColor = props.piece?.ChessPiece.Color == ChessColor.White ? styles.textWhite : styles.textBlack;
	const style = [styles.default, colorStyle];
	const textStyle = [styles.text, textColor];
	const selectedPiece = useStoreState(state => state.selectedPiece);
	const isDestinationPosition = useStoreState(state => state.possibleMoves)
		.filter(m => arePositionsTheSame(m.ChessMove.FinishedPosition, props.position))
		.length !== 0;

	if (selectedPiece !== undefined && selectedPiece === props.piece) {
		style[1] = styles.selected;
	}
	if (isDestinationPosition) {
		style[1] = styles.destination;
	}
	const selectPiece = useStoreActions(actions => actions.selectPiece);

	const onPress = (e: GestureResponderEvent) => {
		console.log("Pressed");
		selectPiece(props.position);
		return true;
	}

	const str = ChessLookup(props.piece);
	return (
		<View onStartShouldSetResponder={onPress} style={style}>
			<Text style={textStyle}>{str}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	textWhite: {
		color: "white",
	},
	textBlack: {
		color: "black",
	},
	text: {
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 25,
	},
	default: {
		justifyContent: "center",
		minHeight: 50,
		minWidth: 50,
	},
	white: {
		backgroundColor: "#5e5e5e",
	},
	black: {
		backgroundColor: "#2e2e2e",
	},
	selected: {
		backgroundColor: "#6e6e9e"
	},
	destination: {
		backgroundColor: "#9e6e6e"
	}
});
export default ChessPosition;