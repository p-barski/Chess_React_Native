export default interface Position {
	X: number;
	Y: number;
}

export function isPosition(obj: any): obj is Position {
	return (
		obj !== null &&
		typeof obj === "object" &&
		typeof obj.X === "number" &&
		typeof obj.Y === "number"
	);
}

export const arePositionsTheSame = (
	pos1: Position | undefined,
	pos2: Position | undefined
) => {
	return (
		(pos1 === undefined && pos2 === undefined) ||
		(pos1 !== undefined &&
			pos2 !== undefined &&
			pos1.X === pos2.X &&
			pos1.Y === pos2.Y)
	);
};
