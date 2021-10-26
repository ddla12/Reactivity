const { defaults } = require("jest-config");

module.exports = {
    testEnvironment: "node",
    moduleFileExtensions: [...defaults.moduleFileExtensions],
    testMatch: ["**/*.spec.ts"],
    coveragePathIgnorePatterns: ["/node_modules/"],
    verbose: true,
    preset: "ts-jest",
};
