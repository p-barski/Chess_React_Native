import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ChessPieceType } from "../Chess/ChessEnums/ChessPieceType";
import { useStoreState, useStoreActions } from "../store/hooks"


const PromotionView = () => {
	const isPromotionRequired = useStoreState(state => state.isPromotionRequired);
	const promotePawn = useStoreActions(actions => actions.promotePawn);
	const onPress = (type: ChessPieceType) => {
		promotePawn(type);

	}
	const style: object[] = [styles.container, styles.hidden];
	if (isPromotionRequired) {
		style[1] = styles.visible;
	}

	return (
		<View style={style}>
			<Text style={styles.text}>Promote your pawn:</Text>
			<Button onPress={() => { onPress(ChessPieceType.Queen) }} title="Queen"></Button>
			<Button onPress={() => { onPress(ChessPieceType.Rook) }} title="Rook"></Button>
			<Button onPress={() => { onPress(ChessPieceType.Bishop) }} title="Bishop"></Button>
			<Button onPress={() => { onPress(ChessPieceType.Knight) }} title="Knight"></Button>
		</View>
	);
}

const styles = StyleSheet.create({
	visible: {
		display: "flex",
	},
	hidden: {
		display: "none",
		height: 0,
		width: 0,
	},
	container: {
		position: "absolute",
		zIndex: 1,
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
		overflow: "visible",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		justifyContent: "center"
	},
	text: {
		color: "white",
		fontSize: 40,
	}
});
export default PromotionView;