export function spinalCase(str: string) {
	str = str.replace(/:/g, "")
	return str
		.split(/\s|_|(?=[A-Z])/)
		.join("-")
		.replace(/,/g, "")
		.toLowerCase()
}
