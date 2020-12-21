import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { v4 as uuidv4 } from "uuid"

import Book from "../components/book"

const Grid = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
	grid-auto-rows: 20px;
	padding: 10px;
	width: 100%;
`

const Body = styled.div`
	font-size: 22px;
	display: flex;
`

interface IBackground {
	modalOpen: boolean
}

const Background = styled.div<IBackground>`
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: -1;
	height: 100vh;
	opacity: 0;
	background: rgba(62, 68, 98, 0.5);
	transition: cubic-bezier(0.34, 1.56, 0.64, 1) 1.5s;

	${props =>
		props.modalOpen &&
		css`
			z-index: 9999;
			opacity: 1;
		`}
`

const Modal = styled.div`
	font-size: 16px;
	max-width: 520px;
	width: 90%;
	background: white;
	padding: 20px;
	box-shadow: 0px 14px 44px rgba(62, 68, 98, 0.1);
	transform: scale(0.9);
	animation: fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1s;
	animation-fill-mode: forwards;
`

const Home = () => {
	const [goodreads, setGoodreads] = useState<any>([])
	const [openBook, setOpenBook] = useState<any>([])
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [allRefs, setAllRefs] = useState<any>([])

	useEffect(() => {
		;(async function getTweets() {
			await fetch("/api/get-goodreads", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then((res: any) => res.json())
				.then((json: any) => {
					const booksWithids = async () => {
						return Promise.all(
							json.books.map(async (book: any, index: number) => {
								return {
									...book,
									id: uuidv4(),
									origIndex: index,
									sizeFactor: Math.floor(Math.random() * 15) + 10,
									image_url: `/books/${book.imageName}.jpg`
								}
							})
						)
					}

					booksWithids().then(data => {
						setGoodreads(data)
					})
				})
				.catch((error: any) => console.log(error))
		})()
	}, [])

	const handleRefs = (ref: any) => {
		console.log(allRefs)
		setAllRefs((allRefs: any) => [...allRefs, ref])
	}

	const openModal = (book: any) => {
		console.log(book)
		setOpenBook(book)
		setModalOpen(!modalOpen)
	}

	const gridRef = useRef(null)

	function resizeGridItem(item: any) {
		let grid = gridRef.current
		if (grid) {
			let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"))
			let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap"))
			let rowSpan = Math.ceil((item?.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))

			return `span ${rowSpan}`
		}
	}

	return (
		<Body>
			<Background modalOpen={modalOpen} onClick={() => setModalOpen(false)}>
				<Modal>
					<h1>
						{openBook.title} - {openBook.author}
						<img src={openBook.image_url} />
						{openBook.rating > 0 ? openBook.rating : ""}
						{console.log(openBook)}
					</h1>
				</Modal>
			</Background>

			<Grid ref={gridRef}>
				{goodreads?.map((book: any) => {
					return (
						<Book
							key={book.id}
							book={book}
							openModal={() => openModal(book)}
							handleRefs={(ref: any) => handleRefs(ref)}
							resizeGridItem={resizeGridItem}
						/>
					)
				})}
			</Grid>
		</Body>
	)
}

export default Home
