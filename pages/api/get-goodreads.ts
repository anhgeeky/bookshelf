import { NextApiRequest, NextApiResponse } from "next"
const xml2js = require("xml2js")
const Cache = require("@11ty/eleventy-cache-assets")

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET") {
		const myCredentials = {
			key: "l1pAAuNP3nQiGBITkdlvaA",
			secret: "fHiQ9fjnYZQiXAO5t1hI31ZRD4RNCk2t5DgX6djWgGA"
		}

		let books: any = []

		await Cache(
			`https://www.goodreads.com/review/list?v=2&id=${50441950}&shelf=read&key=${myCredentials.key}&per_page=200`,
			{
				duration: "1d",
				type: "text"
			}
		)
			.then((body: any) => {
				xml2js.parseString(body, function (err: any, res: any) {
					if (err) console.log(err)
					console.log("Getting Book List from GoodReads API")

					let bookList = res.GoodreadsResponse.reviews[0].review

					for (let i = 0; i < bookList.length; i++) {
						books.push({
							title: bookList[i].book[0].title[0],
							spinal_title: spinalCase(bookList[i].book[0].title[0]),
							author: bookList[i].book[0].authors[0].author[0].name[0],
							isbn: bookList[i].book[0].isbn[0],
							image_url: bookList[i].book[0].image_url[0],
							small_image_url: bookList[i].book[0].image_url[0],
							large_image_url: bookList[i].book[0].large_image_url[0],
							link: bookList[i].book[0].link[0],
							date_started: bookList[i].date_added[0],
							date_finished: bookList[i].read_at[0],
							date_updated: bookList[i].date_updated[0],
							rating: bookList[i].rating[0]
						})
					}
				})
			})
			.catch((err: any) => console.log(err))

		await Cache(
			`https://www.goodreads.com/review/list?v=2&id=${50441950}&shelf=currently-reading&key=${
				myCredentials.key
			}&per_page=200`,
			{
				duration: "1d",
				type: "text"
			}
		)
			.then((body: any) => {
				xml2js.parseString(body, function (err: any, res: any) {
					if (err) console.log(err)
					console.log("Getting Book List from GoodReads API")

					let bookList = res.GoodreadsResponse.reviews[0].review

					for (let i = 0; i < bookList.length; i++) {
						books.push({
							title: bookList[i].book[0].title[0],
							spinal_title: spinalCase(bookList[i].book[0].title[0]),
							author: bookList[i].book[0].authors[0].author[0].name[0],
							isbn: bookList[i].book[0].isbn[0],
							image_url: bookList[i].book[0].image_url[0],
							small_image_url: bookList[i].book[0].image_url[0],
							large_image_url: bookList[i].book[0].large_image_url[0],
							link: bookList[i].book[0].link[0],
							date_started: bookList[i].date_added[0],
							date_finished: bookList[i].read_at[0],
							date_updated: bookList[i].date_updated[0],
							rating: bookList[i].rating[0]
						})
					}
				})
			})
			.catch((err: any) => console.log(err))

		return res.status(200).json({ books: books })
	} else {
		return res.status(404).json({
			error: {
				code: "not_found",
				message: "The requested endpoint was not found or doesn't support this method."
			}
		})
	}
}

function spinalCase(str: string) {
	str = str.replace(/:/g, "")
	return str
		.split(/\s|_|(?=[A-Z])/)
		.join("-")
		.toLowerCase()
}
