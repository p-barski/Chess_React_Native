import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { PlayResult } from "../Chess/ChessEnums/PlayResult";
import { useStoreState, useStoreActions } from "../store/hooks"


const GameFinishView = () => {
	const lastPlayResult = useStoreState(state => state.lastPlayResult);
	const findGame = useStoreActions(actions => actions.findGame);
	const onPress = () => {
		findGame();
	}
	const style: object[] = [styles.container, styles.visible];
	if (lastPlayResult === PlayResult[PlayResult.Success] ||
		lastPlayResult === PlayResult[PlayResult.PromotionRequired] ||
		lastPlayResult === PlayResult[PlayResult.Check]) {
		style[1] = styles.hidden;
	}

	return (
		<View style={style}>
			<Text style={styles.text}>{lastPlayResult}</Text>
			<Button onPress={onPress} title="Find another game"></Button>
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
export default GameFinishView;