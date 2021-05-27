import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { useStoreState, useStoreActions } from "../store/hooks"


const SideBar = () => {
	const isDuringGame = useStoreState(state => state.isDuringGame);
	const isVisible = useStoreState(state => state.isSideBarOpen);
	const findGame = useStoreActions(actions => actions.findGame);
	const closeGame = useStoreActions(actions => actions.closeGame);
	const setIsLoggingIn = useStoreActions(actions => actions.setIsLoggingIn);
	const setIsRegistering = useStoreActions(actions => actions.setIsRegistering);
	const setIsSideBarOpen = useStoreActions(actions => actions.setIsSideBarOpen);

	const style: object[] = [styles.container, styles.hidden];
	if (isVisible) {
		style[1] = styles.visible;
	}
	const onFindGame = () => {
		findGame();
	}

	const onClosePress = () => {
		if (isDuringGame) {
			closeGame();
		}
	};

	const onLogInPress = () => {
		setIsLoggingIn(true);
		setIsSideBarOpen(false);
	};

	const onRegisterPress = () => {
		setIsRegistering(true);
		setIsSideBarOpen(false);
	};

	const onCloseSideBarPress = () => {
		setIsSideBarOpen(false);
	};

	return (
		<View style={style}>
			<Button onPress={onCloseSideBarPress} title="≡"></Button>
			<Button onPress={onFindGame} title="Find game"></Button>
			<Button onPress={onClosePress} title="Close game"></Button>
			<Button onPress={onLogInPress} title="Log in"></Button>
			<Button onPress={onRegisterPress} title="Register"></Button>
		</View >
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
		right: 0,
		top: 0,
		width: 100,
		height: "100%",
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
export default SideBar;