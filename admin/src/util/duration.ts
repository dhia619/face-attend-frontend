
export function splitMinutes(minutes: number) {
    return {
        hours: Math.floor(minutes / 60),
		minutes: minutes % 60,
    }
}