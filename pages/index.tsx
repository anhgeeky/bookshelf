import React, { useRef } from "react"
import styled from "styled-components"
import Head from "next/head"
import Modal from "react-modal"

import Book from "../book/component/book"

import { IBookRes } from "../book/types/book"

import { usePopulateBooks } from "../book/hooks/usePopulateBooks"
import { useRouter } from "next/router"
import { useContextualRouting } from "next-use-contextual-routing"
import Details from "../review/components/details"

const Grid = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
	grid-auto-rows: 30px;
	width: 100%;
	padding: 30px;

	@media (min-width: 500px) {
		padding: 10px;
	}
`

const Body = styled.div`
	font-size: 22px;
	display: flex;
	flex-direction: column;
`

Modal.setAppElement("#__next")

const Home = () => {
	const { goodreads } = usePopulateBooks()
	const gridRef = useRef(null)

	const router = useRouter()

	const { returnHref } = useContextualRouting()

	return (
		<Body>
			<Head>
				<title>Digital book shelf</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="Digital bookshelf with some quick thoughts thrown in." />
			</Head>

			<Modal
				closeTimeoutMS={400}
				isOpen={!!router.query.id}
				onRequestClose={() => router.push(returnHref)}
				contentLabel="Post modal"
				style={{
					overlay: {
						backgroundColor: "rgba(255, 255, 255, 0.3)"
					},
					content: {
						inset: "15px",
						padding: "10px",
						left: "10px",
						right: "10px",
						top: "10px",
						bottom: "10px"
					}
				}}>
				<Details
					close={() => router.push(returnHref)}
					id={router.query.id}
					book={goodreads.find(book => book.href === router.query.id)}
				/>
			</Modal>
			<Grid ref={gridRef}>
				{goodreads?.map((book: IBookRes) => (
					<Book key={book.id} book={book} gridRef={gridRef} />
				))}
			</Grid>
		</Body>
	)
}

export default Home
