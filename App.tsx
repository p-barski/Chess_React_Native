import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StoreProvider } from 'easy-peasy';
import { StatusBar } from "expo-status-bar";
import ChessBoard from "./src/components/ChessBoard"
import store from "./src/store/store"


export default function App() {
	return (
		<StoreProvider store={store}>
			<View style={styles.container}>
				<Text>Chess</Text>
				<Button onPress={() => store.dispatch.findGame()} title="Find game" />
				<ChessBoard />
				<StatusBar style="auto" />
			</View>
		</StoreProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
