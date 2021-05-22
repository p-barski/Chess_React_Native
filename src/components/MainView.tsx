import React from "react";
import { StyleSheet, Text, View, GestureResponderEvent } from "react-native";
import { useStoreState, useStoreActions } from "../store/hooks"
import ChessBoard from "./ChessBoard";


const MainView = () => {
	const isConnected = useStoreState(state => state.isConnected);
	const isDuringGame = useStoreState(state => state.isDuringGame);
	const isSearchingForGame = useStoreState(state => state.isSearchingForGame);
	const findGame = useStoreActions(actions => actions.findGame);

	const onPress = (e: GestureResponderEvent) => {
		if (!isConnected) {
			return false;
		} if (isDuringGame) {
			return false;
		}
		findGame();
		return true;
	}

	let content: JSX.Element;
	if (isDuringGame) {
		content = <ChessBoard />
	}
	else if (isSearchingForGame) {
		content = <Text style={styles.text}>Searching for game...</Text>;
	}
	else {
		content = <Text style={styles.text}>Find game</Text>;
	}
	return (
		<View onStartShouldSetResponder={onPress} style={styles.container}>
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		height: "90%",
		textAlignVertical: "center",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
		backgroundColor: "#1e1e1e",
		borderWidth: 10,
	},
	text: {
		color: "white",
		fontSize: 40,
	}
});
export default MainView;