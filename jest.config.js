module.exports = {
	collectCoverageFrom: [
		"**/*.{ts,tsx}",
		"!**/node_modules/**",
		"!**/.storybook/**",
		"!**/tests/**",
		"!**/coverage/**",
		"!jest.config.js"
	],
	globals: {
		// we must specify a custom tsconfig for tests because we need the typescript transform
		// to transform jsx into js rather than leaving it jsx such as the next build requires.  you
		// can see this setting in tsconfig.jest.json -> "jsx": "react"
		"ts-jest": {
			tsConfig: "jest.tsconfig.json"
		}
	},
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100
		}
	},
	setupFiles: ["<rootDir>/enzyme.js"],
	preset: "ts-jest",
	testPathIgnorePatterns: ["/.next/", "/node_modules/", "/lib/", "/tests/", "/coverage/", "/.storybook/"],
	testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
	testURL: "http://localhost",
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	moduleNameMapper: {
		"\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js"
	},
	transform: {
		".(ts|tsx)$": "babel-jest"
	},
	transformIgnorePatterns: ["<rootDir>/node_modules/"]
}
