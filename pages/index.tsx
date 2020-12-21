import React, { useRef } from "react"
import styled, { css } from "styled-components"
import Head from "next/head"

import Book from "../components/book"

import { IBookRes } from "../types/book"

import { usePopulateBooks } from "../hooks/usePopulateBooks"

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

const Header = styled.div`
	h1 {
		font-family: "Raleway", sans-serif;
		font-size: 36px;
		text-align: center;
		margin: 10px 0;
		color: #141414;
	}

	@media (min-width: 500px) {
		margin: 20px 0;
	}
`

const Home = () => {
	const { goodreads } = usePopulateBooks()
	const gridRef = useRef(null)

	return (
		<Body>
			<Head>
				<title>Jack's Digital Book Shelf | The only downside of having everything on a Kindle</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header>
				<h1>Jack's Digital Book Shelf</h1>
			</Header>
			<Grid ref={gridRef}>
				{goodreads?.map((book: IBookRes) => (
					<Book key={book.id} book={book} gridRef={gridRef} />
				))}
			</Grid>
		</Body>
	)
}

export default Home
