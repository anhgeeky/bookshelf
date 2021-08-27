import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { Fade } from "react-awesome-reveal"
import Image from "next/image"

import { useRouter } from "next/router"

import { useContextualRouting } from "next-use-contextual-routing"

import { IBookRes } from "../types/book"

import { resizeGridItem } from "../../utils/resizeGridItem"

interface IBookEl {
	sizeFactor?: number
	noHover?: boolean
}

const BookEl = styled.div<IBookEl>`
	height: 148px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	> div {
		object-fit: cover;
		cursor: ${props => (props.noHover ? "auto" : "pointer")};

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

const BookWrap = styled.div``

interface IBook {
	delay?: number
	book: IBookRes
	gridRef?: any
	noHover?: boolean
}

const Book: React.FC<IBook> = ({ book, delay, gridRef, noHover }) => {
	const newRef = useRef(null)
	const [span, setSpan] = useState<any>("")

	const { makeContextualHref } = useContextualRouting()
	const router = useRouter()

	const openModal = () =>
		router.push(makeContextualHref({ id: book.href }), `books/${book.href}`, {
			shallow: true
		})

	useEffect(() => {
		if (gridRef) {
			setSpan(resizeGridItem(newRef.current, gridRef.current))
		}
	}, [newRef])

	return (
		<Fade delay={delay ? delay : 700} triggerOnce cascade style={{ gridRowEnd: span }}>
			<BookWrap>
				<BookEl ref={newRef} sizeFactor={book.sizeFactor} onClick={openModal} noHover={noHover}>
					<Image
						objectFit="cover"
						src={book.image_url}
						alt={book.title}
						width={14.8 * book.sizeFactor}
						height={10 * book.sizeFactor}
					/>
				</BookEl>
			</BookWrap>
		</Fade>
	)
}

export default Book
