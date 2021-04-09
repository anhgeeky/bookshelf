import "../styles/global.css"
import "../styles/reset.css"

import { AppProps } from "next/app"
import { hotjar } from "react-hotjar"

hotjar.initialize(2341301, 6)

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default App
