import * as books from "../data/books.json"

let arr = books.books

export async function generatePages() {
	const params = arr.map((book: any) => {
		return {
			params: {
				id: book.href
			}
		}
	})

	return params
}
