export default interface ChessPlayResultMessage {
	Message: string;
	IsClientTurn: boolean;
	IsPromotionRequired: boolean;
}

export function isChessPlayResultMessage(
	obj: any
): obj is ChessPlayResultMessage {
	return (
		obj !== null &&
		typeof obj === "object" &&
		typeof obj.Message === "string" &&
		typeof obj.IsClientTurn === "boolean" &&
		typeof obj.IsPromotionRequired === "boolean"
	);
}
