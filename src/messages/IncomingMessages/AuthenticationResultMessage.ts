export default interface AuthenticationResultMessage {
	IsSuccess: boolean;
	ErrorMessage: string;
}

export function isAuthenticationResultMessage(
	obj: any
): obj is AuthenticationResultMessage {
	return (
		obj !== null &&
		typeof obj === "object" &&
		typeof obj.IsSuccess === "boolean" &&
		typeof obj.ErrorMessage === "string"
	);
}
