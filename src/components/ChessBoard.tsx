import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useStoreState } from "../store/hooks"
import ChessPosition from "./ChessPosition"


const ChessBoard = () => {
	const rows: JSX.Element[] = [];
	const boardSize = 8;
	for (let x = 0; x < boardSize; x++) {
		const positions: JSX.Element[] = [];
		for (let y = boardSize - 1; y >= 0; y--) {
			const piece = useStoreState((state) => state.pieces)
				.filter(p =>
					p.ChessPiece.Position.X === x &&
					p.ChessPiece.Position.Y === y)[0];
			const num = x * boardSize + y;
			const isWhite = (y + x) % 2 === 0
			const position = { X: x, Y: y };
			positions.push(<ChessPosition key={num} isWhite={isWhite} piece={piece} position={position} />);
		}
		const row = <View key={x * boardSize} style={styles.row}>{positions}</View>;
		rows.push(row);
	}
	const isConnected = useStoreState(state => state.isConnected);

	return (
		<View style={styles.container}>
			{rows}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		//width: "100%",
		//height: "100%",
	},
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#1e1e1e",
		//width: "100%",
		//height: "100%",
	},
});
export default ChessBoard;