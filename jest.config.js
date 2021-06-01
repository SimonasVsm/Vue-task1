module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  rootDir: "./",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
}
