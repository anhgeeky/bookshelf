import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import * as books from "../data/books.json"
import { IBookRes } from "../types/book"

import { shuffle } from "../utils/shuffle"
import { spinalCase } from "../utils/spinalCase"

export const usePopulateBooks = () => {
	const [goodreads, setGoodreads] = useState<IBookRes[]>([])

	useEffect(() => {
		let newBooks = books.books.map((book: any, index: number) => {
			return {
				...book,
				id: uuidv4(),
				index: index,
				sizeFactor: Math.floor(Math.random() * 15) + 10,
				spinal_title: spinalCase(book.title),
				image_url: `/books/${spinalCase(book.title)}-${spinalCase(book.author)}.jpg`
			}
		})

		setGoodreads(shuffle(newBooks))
	}, [books])

	return { goodreads }
}
