import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ChessColor } from "../Chess/ChessEnums/ChessColor";
import { useStoreState, useStoreActions } from "../store/hooks"


const TopBar = () => {
	const isDuringGame = useStoreState(state => state.isDuringGame);
	const color = useStoreState(state => state.myColor);
	const isMyTurn = useStoreState(state => state.isMyTurn);
	const setIsSideBarOpen = useStoreActions(actions => actions.setIsSideBarOpen);

	let myTurnText = "";
	let colorText = "";
	if (isDuringGame) {
		myTurnText = isMyTurn ? "Turn: You" : "Turn: Opponent";
		colorText = color === ChessColor.White ? "Color: White" : "Color: Black";
	}

	const onOpenSideBarPress = () => {
		setIsSideBarOpen(true);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{myTurnText}</Text>
			<Text style={styles.text}>{colorText}</Text>
			<Button onPress={onOpenSideBarPress} title="≡"></Button>
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
		justifyContent: "space-between",
		backgroundColor: "rebeccapurple",
	},
	text: {
		color: "white",
		fontSize: 20,
	}
});
export default TopBar;