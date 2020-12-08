import { useEffect, useState } from "react"
import styled, { keyframes, createGlobalStyle } from "styled-components"
import { useInView } from "react-intersection-observer"

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
	background: red;
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
	/* width: 50px; */
	height: 500px;
	margin: 0 0.5em;
`

const Home = () => {
	const [goodreads, setGoodreads] = useState<any>([])
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
				.then((json: any) =>
					setGoodreads([...json.books.slice(json.books.length - 5, json.books.length), ...json.books])
				)
				.catch((error: any) => console.log(error))
		})()
	}, [])

	return (
		<Body>
			{/* {inView ? "yes" : "no"} */}
			<GlobalStyle />
			<div id="container">
				<div className="photobanner">
					{goodreads?.map((book: any, index: number) => {
						// const googleSearch = getGoogleSearch(book.)
						return (
							<Book key={`${book.title}-${index}`} ref={index === 2 ? ref : null}>
								{book.title}
								<img src={``} />
								<img src={book.image_url} alt={book.title} />
								<div>{JSON.stringify(book.isbn)}</div>
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
