import React from "react";
import { StyleSheet, Text, View, GestureResponderEvent, Button } from "react-native";
import { useStoreState, useStoreActions } from "../store/hooks"
import ChessBoard from "./ChessBoard";


const TopBar = () => {
	const isConnected = useStoreState(state => state.isConnected);
	const isDuringGame = useStoreState(state => state.isDuringGame);
	const findGame = useStoreActions(actions => actions.findGame);

	return (
		<View style={styles.container}>
			<Text style={{ color: "white" }}>TopBar</Text>
		</View >
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		height: "10%",
		textAlignVertical: "center",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
		backgroundColor: "rebeccapurple",
		borderWidth: 10,
	},
	text: {
		color: "white",
		fontSize: 40,
		borderWidth: 10,
	}
});
export default TopBar;