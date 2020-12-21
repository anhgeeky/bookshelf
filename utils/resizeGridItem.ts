export function resizeGridItem(bookRef: any, gridRef: any) {
	if (gridRef) {
		let rowHeight = parseInt(window.getComputedStyle(gridRef).getPropertyValue("grid-auto-rows"))
		let rowGap = parseInt(window.getComputedStyle(gridRef).getPropertyValue("grid-row-gap"))
		let rowSpan = Math.ceil((bookRef?.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))

		return `span ${rowSpan}`
	}
}
