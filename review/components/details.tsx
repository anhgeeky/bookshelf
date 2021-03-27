import React, { useEffect, useState } from "react"
import styled from "styled-components"

import Book from "../../book/component/book"

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

const Details = ({ close, id, book }: any) => {
	const [localBook, setLocalBook] = useState<any>(null)

	useEffect(() => {
		if (book) {
			setLocalBook({ ...book, sizeFactor: 25 })
		}
	}, [])

	return (
		<Layout>
			<Row>
				<button onClick={close}>Close</button>
			</Row>
			<Row>
				<Col width={40}>{localBook && <Book delay={10} book={localBook} />}</Col>
				<Col width={60}>{JSON.stringify(book)}</Col>
			</Row>
		</Layout>
	)
}

export default Details
