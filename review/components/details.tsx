import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ReactStars from "react-rating-stars-component"
import { Fade } from "react-awesome-reveal"

import Book from "../../book/component/book"

import Link from "next/link"

import Heading from "../../shared/components/heading"
import useWindowDimensions from "../../shared/hooks/useWindowDimensions"

import { size } from "../../utils/sizes"

const Details = ({ book }: any) => {
	const [localBook, setLocalBook] = useState<any>(null)

	const { width } = useWindowDimensions()

	useEffect(() => {
		if (book) {
			setLocalBook({ ...book, sizeFactor: width > 850 ? 40 : 30 })
		}
	}, [])

	if (book) {
		return (
			<Layout data-test="details">
				<Link href="/" passHref scroll={false}>
					<ButtonEl>
						<svg viewBox="0 0 365.71733 365" xmlns="http://www.w3.org/2000/svg">
							<g fill="#16181a">
								<path d="M356.339844 296.347656L69.726562 9.734375c-12.5-12.5-32.765624-12.5-45.246093 0L9.375 24.816406c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0" />
								<path d="M295.988281 9.734375L9.375 296.347656c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094L341.257812 9.757812c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0" />
							</g>
						</svg>
					</ButtonEl>
				</Link>
				<StyledRowFade cascade triggerOnce>
					<Row>
						<Col width={45}>
							{localBook && (
								<BookContainer>
									<Book delay={400} book={localBook} noHover />
								</BookContainer>
							)}
						</Col>
						<Col width={55}>
							<div style={{ width: "100%" }}>
								<Heading data-test="book-title" level="h1" style={{ marginBottom: "10px", width: "90%" }}>
									{book.title}
								</Heading>
								<Heading data-test="book-author" level="h2" weight={400} style={{ marginBottom: "10px", width: "90%" }}>
									{book.author}
								</Heading>

								{book.review && (
									<div data-test="book-review">
										<ReactStars edit={false} count={10} value={Number(book.rating)} size={18} activeColor="#ffd700" />
										<Heading level="h3" levelClass="h3" style={{ margin: "10px 0" }}>
											My quick take
										</Heading>
										<p>{book.review}</p>
									</div>
								)}
								{book.link && (
									<div style={{ paddingBottom: "10px" }}>
										<ButtonLink href={book.link} target="_blank">
											Goodreads
										</ButtonLink>
									</div>
								)}
							</div>
						</Col>
					</Row>
				</StyledRowFade>
			</Layout>
		)
	}

	return <div></div>
}

export default Details

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	position: relative;
`

const Row = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	@media (min-width: ${size.tablet}) {
		flex-direction: row;
	}
`

const StyledRowFade = styled(Fade)`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	@media (min-width: ${size.tablet}) {
		flex-direction: row;
	}
`

interface ICol {
	width: number
}

const Col = styled.div<ICol>`
	padding: 10px;
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;

	@media (min-width: ${size.tablet}) {
		flex-direction: row;
		width: ${props => props.width}%;
	}
`

const ButtonLink = styled.a`
	display: inline-flex;
	background: black;
	padding: 10px;
	text-decoration: none;
	color: white;
	margin-top: 10px;
`

const ButtonEl = styled.a`
	border: 0;
	outline: none;
	display: inline-block;
	background: transparent;
	position: fixed;
	margin: 0;
	right: 30px;
	top: 30px;
	cursor: pointer;
	width: 25px;
	height: 25px;
	z-index: 999;

	svg {
		height: 25px;
		width: 25px;
		position: absolute;
		right: 0;
		top: 0;
	}

	@media (min-width: ${size.tablet}) {
		margin: 10px 10px 10px 10px;
	}
`

const BookContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`
