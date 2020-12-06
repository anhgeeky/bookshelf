import { useEffect, useState } from "react"
import styled from "styled-components"

const Body = styled.div`
	font-size: 22px;
	min-height: 100vh;
`

const Home = () => {
	const [goodreads, setGoodreads] = useState({ null: "true" })

	useEffect(() => {
		;(async function getTweets() {
			await fetch("/api/get-goodreads", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then((res: any) => res.json())
				.then((json: any) => setGoodreads(json))
				.catch((error: any) => console.log(error))
		})()
	}, [])
	return (
		<Body>
			<pre>{goodreads && JSON.stringify(goodreads, null, 2)}</pre>
		</Body>
	)
}

export default Home
