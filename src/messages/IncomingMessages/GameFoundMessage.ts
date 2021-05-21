export default interface GameFoundMessage {
	IsClientTurn: boolean;
}

export function isGameFoundMessage(obj: any): obj is GameFoundMessage {
	return (
		obj !== null &&
		typeof obj === "object" &&
		typeof obj.IsClientTurn === "boolean" &&
		Object.keys(obj).length == 1
	);
}
