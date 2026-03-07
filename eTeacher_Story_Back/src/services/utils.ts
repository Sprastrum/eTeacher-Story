export function Random(min = 0, max: number): number {
	return Math.floor((Math.random() * max) + min);
}
