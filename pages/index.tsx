import { useEffect, useState } from "react"
import styled, { keyframes, css } from "styled-components"
import { useInView } from "react-intersection-observer"
import { v4 as uuidv4 } from "uuid"

const bannermove = keyframes`
	0% {
		transform: translate(0, 0);
	}
	100% {
		transform: translate(-5000%, 0);
	}
`

const Container = styled.div`
	height: 350px;
	position: relative;
	overflow: hidden;
	width: 100%;
`

const Banner = styled.div`
	position: absolute;
	display: flex;
	top: 0px;
	left: 0px;
	overflow: hidden;
	white-space: nowrap;
	animation: ${bannermove} 10000s linear infinite;
`

const Body = styled.div`
	font-size: 22px;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

interface IBook {
	trigger: boolean
}

const Book = styled.div<IBook>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 250px;
	margin: 0 0.5em;

	img {
		height: 148px;
		width: 100px;
		object-fit: cover;
		box-shadow: 0px 14px 44px rgba(62, 68, 98, 0.2);
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

const Home = () => {
	const [goodreads, setGoodreads] = useState<any>([])
	const [original, setOriginal] = useState<any>([])
	const [openBook, setOpenBook] = useState<any>([])
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const [originalLength, setOriginalLength] = useState<number>(10)

	const { ref, inView } = useInView({
		/* Optional options */
		threshold: 0
	})

	useEffect(() => {
		;(async function getTweets() {
			await fetch("/api/get-goodreads", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then((res: any) => res.json())
				.then((json: any) => {
					const booksWithids = json.books.map((book: any) => {
						return {
							id: uuidv4(),
							...book
						}
					})

					const dupBooks = json.books.map((book: any) => {
						return {
							id: uuidv4(),
							...book
						}
					})

					setGoodreads([...booksWithids, ...dupBooks])
					setOriginal(booksWithids)
					setOriginalLength(booksWithids.length)
				})
				.catch((error: any) => console.log(error))
		})()
	}, [])

	useEffect(() => {
		if (inView) {
			const newBooks = original.map((book: any) => {
				return {
					...book,
					id: uuidv4()
				}
			})

			if (goodreads.length >= originalLength * 3) {
				const newGoodReads = goodreads.slice(0, originalLength * 2)
				setGoodreads([...newGoodReads])
			}

			setGoodreads((goodreads: any) => [...goodreads, ...newBooks])
		}
	}, [inView])

	const openModal = (book: any) => {
		console.log(book)
		setOpenBook(book)
		setModalOpen(!modalOpen)
	}

	return (
		<>
			{inView ? "yes" : "no"}
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
				<Container>
					<Banner>
						{goodreads?.map((book: any, index: number) => {
							return (
								<Book
									key={book.id}
									ref={index + 1 === originalLength ? ref : null}
									trigger={index + 1 === originalLength}
									onClick={() => openModal(book)}>
									{/* {book.title} */}
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
					</Banner>
				</Container>
			</Body>
		</>
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
