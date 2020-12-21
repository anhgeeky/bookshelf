import { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { v4 as uuidv4 } from "uuid"

const Container = styled.div`
	/* position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start; */
	background: red;
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: flex-start;
`

const Body = styled.div`
	font-size: 22px;

	display: flex;
`

interface IBook {
	trigger?: boolean
}

const Book = styled.div<IBook>`
	height: 148px;
	width: 100px;
	cursor: pointer;

	img {
		height: 148px;
		width: 100px;
		object-fit: cover;
		/* box-shadow: 0px 14px 44px rgba(62, 68, 98, 0.2); */
	}

	${props =>
		props.trigger &&
		css`
			background: purple;
		`}
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

const Test = styled.div`
	background: pink;
	padding: 10px;
	width: 100%;
`

const Home = () => {
	const [goodreads, setGoodreads] = useState<any>([])
	const [openBook, setOpenBook] = useState<any>([])
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	useEffect(() => {
		;(async function getTweets() {
			await fetch("/api/get-goodreads", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then((res: any) => res.json())
				.then((json: any) => {
					const booksWithids = json.books.map((book: any, index: number) => {
						return {
							id: uuidv4(),
							origIndex: index,
							...book
						}
					})

					setGoodreads(booksWithids)
				})
				.catch((error: any) => console.log(error))
		})()
	}, [])

	const openModal = (book: any) => {
		console.log(book)
		setOpenBook(book)
		setModalOpen(!modalOpen)
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
			<Test>
				<Container>
					{goodreads?.map((book: any) => {
						return (
							<Book key={book.id} onClick={() => openModal(book)}>
								{/* {book.title} */}
								{/* <div>{index + 1} - index + one</div> */}
								<img src={book.image_url} alt={book.title} />
								{/* {console.log(book)} */}
								{/* {book.title}
							{book.spinal_title}
							{book.author}
							{book.isbn}
							{book.image_url}
							{book.small_image_url}
							{book.large_image_url}
							{book.link}
							{book.date_started}
							{book.date_finished}
							{book.date_updated}
							{book.rating} */}
							</Book>
						)
					})}
				</Container>
			</Test>
		</Body>
	)
}

export default Home

// <img
// 	src={
// 		book.image_url.includes("nophoto")
// 			? `http://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
// 			: book.image_url
// 	}
// 	alt={book.title}
// />
