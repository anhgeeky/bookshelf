import { useEffect, useState } from "react"
import styled, { keyframes, createGlobalStyle, css } from "styled-components"
import { useInView } from "react-intersection-observer"
import { v4 as uuidv4 } from "uuid"

const GlobalStyle = createGlobalStyle`
#container {
	height: 350px;
	position: relative;
	overflow: hidden;
}

.photobanner {
	position: absolute;
	display: flex;
	top: 0px;
	left: 0px;
	overflow: hidden;
	white-space: nowrap;
	animation: bannermove 100s linear infinite;
}


@keyframes bannermove {
	0% {
		transform: translate(0, 0);
	}
	100% {
		transform: translate(-50%, 0);
	}
}

`

const Body = styled.div`
	font-size: 22px;
	min-height: 100vh;
`

const Book = styled.div`
	background: green;
	height: 250px;
	margin: 0 0.5em;

	display: flex;

	img {
		max-height: 148px;
		width: 100px;
		object-fit: cover;
	}

	${props =>
		props.trigger &&
		css`
			background: purple;
		`}
`

const Home = () => {
	const [goodreads, setGoodreads] = useState<any>([])
	const [original, setOriginal] = useState<any>([])

	const [originalLength, setOriginalLength] = useState<number>(10)

	const { ref, inView, entry } = useInView({
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

					setGoodreads(booksWithids)
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

	return (
		<Body>
			{inView ? "yes" : "no"}
			<GlobalStyle />
			<div id="container">
				<div className="photobanner">
					{goodreads?.map((book: any, index: number) => {
						// const googleSearch = getGoogleSearch(book.)
						return (
							<Book
								key={book.id}
								ref={index + 1 === originalLength ? ref : null}
								trigger={index + 1 === originalLength}>
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
				</div>
			</div>
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
