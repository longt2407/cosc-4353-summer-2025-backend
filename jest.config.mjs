/** @type {import('jest').Config} */
const config = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	testPathIgnorePatterns: [
		"/node_modules/",
		"<rootDir>/controllers/test.js"
	]
};

export default config;
