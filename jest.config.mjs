export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.test.tsx?$": ["ts-jest"],
  },
};
