import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ReactStars from "react-rating-stars-component"

import Book from "../../book/component/book"

import Heading from "../../shared/components/heading"

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`

const Row = styled.div`
	display: flex;
	width: 100%;
`

interface ICol {
	width: number
}

const Col = styled.div<ICol>`
	width: ${props => props.width}%;
`

const Details = ({ close, book }: any) => {
	const [localBook, setLocalBook] = useState<any>(null)

	useEffect(() => {
		if (book) {
			setLocalBook({ ...book, sizeFactor: 40 })
		}
	}, [])

	if (book) {
		return (
			<Layout>
				<Row>
					<button onClick={close}>Close</button>
				</Row>
				<Row>
					<Col width={45}>{localBook && <Book delay={10} book={localBook} noHover />}</Col>
					<Col width={55}>
						<div>
							<Heading level="h1">{book.title}</Heading>
							<Heading level="h2" levelClass="h3" weight={400}>
								{book.author}
							</Heading>

							<ReactStars edit={false} count={10} value={Number(book.rating)} size={24} activeColor="#ffd700" />

							<div>
								<Heading level="h3" levelClass="h4">
									Thoughts
								</Heading>
								<p>{book.review}</p>
							</div>
						</div>
						<a href={book.link} target="blank">
							Goodreads
						</a>
					</Col>
				</Row>
			</Layout>
		)
	}

	return <div></div>
}

export default Details
