import React from "react"

import { generatePages } from "../../utils/generatePages"

import { useRouter } from "next/router"
import Details from "../../review/components/details"

import * as books from "../../data/books.json"

export default function Book({ id, book }: any) {
	const router = useRouter()

	// const { bookId } = router.query

	return <Details close={() => router.push("/")} id={router.query.id || id} book={book} />
}

export async function getStaticPaths() {
	const paths = await generatePages()

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }: { params: any }) {
	const book = books.books.find(book => book.href === params.id)

	return {
		props: {
			id: params.id,
			book: book
		}
	}
}
