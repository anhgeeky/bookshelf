import * as React from "react"
import { shallow, render } from "enzyme"
import Details from "./details"

let defaultBook: any = {
	href: "the-subtle-art-of-not-giving-a-fuck",
	title: "The Subtle Art of Not Giving a F*ck",
	author: "Mark Manson",
	image_url: "/books/the-subtle-art-of-not-giving-a-fuck-mark-manson.jpg",
	link: "https://www.goodreads.com/book/show/28257707-the-subtle-art-of-not-giving-a-f-ck",
	rating: "6",
	review:
		"I am a sucker for a self help book. Very similar to a lot of other self help books I've read, take responsibility. Set goals. Happiness comes from solving problems. Choose your struggle. You are not special. Things fall apart. The tyranny of exceptionalism. B-b-b-but, if I'm not going to be special or extraordinary, what's the point. The value of suffering. You are always choosing. The responsibility/fault fallacy. Genetics and the hand we're dealt.   How to be a little less certain of yourself.  Pain is part of the process.  The importance of saying no. Rejection makes your life better. Boundaries. How to build trust. Freedom through commitment."
}

let defaultBookMissingReview: any = {
	href: "the-subtle-art-of-not-giving-a-fuck",
	title: "The Subtle Art of Not Giving a F*ck",
	author: "Mark Manson",
	image_url: "/books/the-subtle-art-of-not-giving-a-fuck-mark-manson.jpg",
	link: "https://www.goodreads.com/book/show/28257707-the-subtle-art-of-not-giving-a-f-ck",
	rating: "6",
	review: null
}

export const findByTestAttr = (wrapper: any, val: string) => {
	return wrapper.find(`[data-test="${val}"]`)
}

describe("Component", () => {
	describe("Book", () => {
		it("should render without throwing an error", () => {
			const wrapper = shallow(<Details book={defaultBook} />)

			expect(findByTestAttr(wrapper, "details"))
		})

		it("should render the book title", () => {
			const wrapper = render(<Details book={defaultBook} />)

			expect(findByTestAttr(wrapper, "book-title").text()).toBe(defaultBook.title)
		})

		it("should render the book author", () => {
			const wrapper = render(<Details book={defaultBook} />)

			expect(findByTestAttr(wrapper, "book-author").text()).toBe(defaultBook.author)
		})

		describe("Book Reviews", () => {
			it("should render if one exists", () => {
				const wrapper = render(<Details book={defaultBook} />)

				expect(findByTestAttr(wrapper, "book-review").length).toBe(1)
			})

			it("should NOT render if one doesn't exists", () => {
				const wrapper = render(<Details book={defaultBookMissingReview} />)

				expect(findByTestAttr(wrapper, "book-review").length).toBe(0)
			})
		})
	})
})
