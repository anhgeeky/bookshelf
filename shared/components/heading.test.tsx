import * as React from "react"
import { shallow } from "enzyme"
import Heading from "./heading"

export const findByTestAttr = (wrapper: any, val: string) => {
	return wrapper.find(`[data-test="${val}"]`)
}

describe("Shared", () => {
	describe("Heading", () => {
		it("hould render without throwing an error", () => {
			const wrapper = shallow(<Heading level="h1">Hello there</Heading>)

			expect(wrapper.length).toBe(1)
		})

		it("should render the title", () => {
			const wrapper = shallow(<Heading level="h1">Hello there</Heading>)

			expect(findByTestAttr(wrapper, "heading").text()).toBe("Hello there")
		})

		it("should render the component as the level prop", () => {
			const wrapper = shallow(
				<Heading level="h1" data-test="book-title">
					Hello there
				</Heading>
			)

			expect(findByTestAttr(wrapper, "book-title").matchesElement(<h1>Hello there</h1>)).toBe(true)
		})

		it("should render a h1 tag with a h3 class", () => {
			const wrapper = shallow(
				<Heading level="h1" data-test="book-title" levelClass="h3">
					Hello there
				</Heading>
			)

			expect(findByTestAttr(wrapper, "book-title").hasClass("h3")).toBe(true)
		})
	})
})
