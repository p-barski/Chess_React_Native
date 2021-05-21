export default interface InvalidStateMessage {
	Message: string;
}

export function isInvalidStateMessage(obj: any): obj is InvalidStateMessage {
	return (
		obj !== null &&
		typeof obj === "object" &&
		typeof obj.Message === "string" &&
		Object.keys(obj).length == 1
	);
}
