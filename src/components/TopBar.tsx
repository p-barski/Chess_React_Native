import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ChessColor } from "../Chess/ChessEnums/ChessColor";
import { useStoreState, useStoreActions } from "../store/hooks"


const TopBar = () => {
	const isDuringGame = useStoreState(state => state.isDuringGame);
	const color = useStoreState(state => state.myColor);
	const isMyTurn = useStoreState(state => state.isMyTurn);
	const findGame = useStoreActions(actions => actions.findGame);
	const closeGame = useStoreActions(actions => actions.closeGame);

	let myTurnText = "";
	let colorText = "";
	if (isDuringGame) {
		myTurnText = isMyTurn ? "Turn: You" : "Turn: Opponent";
		colorText = color === ChessColor.White ? "Color: White" : "Color: Black";
	}

	const onFindGame = () => {
		findGame();
	}

	const onClosePress = () => {
		if (isDuringGame) {
			closeGame();
		}
	};

	return (
		<View style={styles.container}>
			<Button onPress={onFindGame} title="Find game"></Button>
			<Text style={styles.text}>{myTurnText}</Text>
			<Text style={styles.text}>{colorText}</Text>
			<Button onPress={onClosePress} title="Close game"></Button>
		</View >
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		height: "10%",
		textAlignVertical: "center",
		alignItems: "center",
		alignContent: "stretch",
		justifyContent: "space-around",
		backgroundColor: "rebeccapurple",
	},
	text: {
		color: "white",
		fontSize: 20,
	}
});
export default TopBar;