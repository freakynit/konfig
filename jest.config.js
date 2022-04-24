module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    "testRegex": ".*test.ts$",
    collectCoverage: true,
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    reporters: [
        "default",
        [
            "./node_modules/jest-html-reporter",
            {
                "pageTitle": "Konfig Test Report",
                "includeFailureMsg": true,
                "outputPath": "./test-report.html"
            }
        ]
    ]
};
