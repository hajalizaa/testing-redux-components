const nextJest = require('next/jest');
const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|jsx?|tsx?|ts?)$';

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testRegex: TEST_REGEX,
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: false
};

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})(customJestConfig);

module.exports = async () => {
  const jestConfig = await createJestConfig();

  return {
    ...jestConfig,
    moduleDirectories: ['node_modules', 'src'],
    modulePaths: ['<rootdir>/src'],
    transformIgnorePatterns: [
      '/node_modules/(?!(axios|swiper|ssr-window|dom7|@splidejs/react-splide)/)'
    ]
  };
};
