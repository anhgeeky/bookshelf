import "../styles/global.css"
import "../styles/reset.css"

import { AppProps } from "next/app"
import useHotjar from "react-use-hotjar"
import { useEffect } from "react"

function App({ Component, pageProps }: AppProps) {
	const { initHotjar } = useHotjar()
	useEffect(() => {
		if (process.env.NODE_ENV === "production") {
			initHotjar(2341301, 6)
		}
	}, [initHotjar])

	return (
		<div>
			<Component {...pageProps} />
		</div>
	)
}

export default App
