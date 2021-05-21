export default interface SessionClosedMessage {
	Reason: string;
}
export function isSessionClosedMessage(obj: any): obj is SessionClosedMessage {
	return (
		obj !== null &&
		typeof obj === "object" &&
		typeof obj.Reason === "string" &&
		Object.keys(obj).length == 1
	);
}
