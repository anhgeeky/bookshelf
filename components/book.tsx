import { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { Fade } from "react-awesome-reveal"
import Image from "next/image"

import { IBookRes } from "../types/book"

import { resizeGridItem } from "../utils/resizeGridItem"
interface IBookEl {
	sizeFactor?: number
}

const BookEl = styled.div<IBookEl>`
	height: 148px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	> div {
		object-fit: cover;
		cursor: pointer;
		box-shadow: 0px 14px 44px rgba(62, 68, 98, 0.2);
	}

	${(props: { sizeFactor?: number }) =>
		props.sizeFactor &&
		css`
			height: ${14.8 * 20 + "px"};

			img {
				height: ${14.8 * 20 + "px"};
				width: ${10 * 20 + "px"};
			}
		`}

	@media (min-width: 500px) {
		${(props: { sizeFactor?: number }) =>
			props.sizeFactor &&
			css`
				height: ${14.8 * props.sizeFactor + "px"};

				img {
					height: ${14.8 * props.sizeFactor + "px"};
					width: ${10 * props.sizeFactor + "px"};
				}
			`}
	}
`

interface IBook {
	book: IBookRes
	gridRef?: any
}

const Book: React.FC<IBook> = ({ book, gridRef }) => {
	const newRef = useRef(null)
	const [span, setSpan] = useState<any>("")

	useEffect(() => {
		setSpan(resizeGridItem(newRef.current, gridRef.current))
	}, [newRef])

	return (
		<Fade delay={700} triggerOnce cascade style={{ gridRowEnd: span }}>
			<a href={book.link} target="_blank">
				<BookEl sizeFactor={book.sizeFactor} ref={newRef}>
					<Image
						objectFit="cover"
						src={book.image_url}
						alt={book.title}
						width={14.8 * book.sizeFactor}
						height={10 * book.sizeFactor}
					/>
				</BookEl>
			</a>
		</Fade>
	)
}

export default Book
