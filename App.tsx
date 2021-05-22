import React from "react";
import { StyleSheet, View } from "react-native";
import { StoreProvider } from 'easy-peasy';
import { StatusBar } from "expo-status-bar";
import store from "./src/store/store"
import MainView from "./src/components/MainView";
import TopBar from "./src/components/TopBar";
import PromotionView from "./src/components/PromotionView";
import GameFinishView from "./src/components/GameFinishView";


export default function App() {
	return (
		<StoreProvider store={store}>
			<View style={styles.container}>
				<TopBar />
				<MainView />
				<PromotionView />
				<GameFinishView />
				<StatusBar style="auto" />
			</View>
		</StoreProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1e1e1e",
		alignItems: "center",
		justifyContent: "center",
	},
});
