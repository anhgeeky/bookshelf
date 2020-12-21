import { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"

import Image from "next/image"

interface IBookEl {
	sizeFactor: number
}

const BookEl = styled.div<IBookEl>`
	height: 148px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		height: 148px;
		object-fit: cover;
		cursor: pointer;
		box-shadow: 0px 14px 44px rgba(62, 68, 98, 0.2);
	}

	${props =>
		props.sizeFactor &&
		css`
			height: ${14.8 * props.sizeFactor + "px"};

			img {
				height: ${14.8 * props.sizeFactor + "px"};
				width: ${10 * props.sizeFactor + "px"};
			}
		`}
`

interface IBook {
	book: any
	openModal: any
	handleRefs: any
	resizeGridItem: any
}

const Book: React.FC<IBook> = ({ book, openModal, handleRefs, resizeGridItem }) => {
	const newRef = useRef(null)
	const [span, setSpan] = useState("")

	useEffect(() => {
		handleRefs(newRef.current)
		setSpan(resizeGridItem(newRef.current))
	}, [newRef])

	return (
		<BookEl style={{ gridRowEnd: span }} onClick={() => openModal(book)} sizeFactor={book.sizeFactor} ref={newRef}>
			{/* {book.title} */}
			{/* <div>{index + 1} - index + one</div> */}
			{/* {JSON.stringify(book.isbn)} */}

			{/* <img src={book.image_url} alt={book.title} /> */}

			<Image src={book.image_url} alt={book.title} width={14.8 * book.sizeFactor} height={10 * book.sizeFactor} />
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
		</BookEl>
	)
}

export default Book
