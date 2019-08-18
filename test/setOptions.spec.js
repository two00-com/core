import { setOptions, apiOptions } from "../src";
import { apiOptionsFixture } from "./fixtures/apiOptions";

test("setOptions | test if object holds correct keys, and types", () => {
  expect(setOptions).toBeTruthy();
  expect(typeof setOptions).toBe("function");
  expect(JSON.stringify(apiOptions)).toBe(JSON.stringify(apiOptionsFixture));

  setOptions({});

  expect(JSON.stringify(apiOptions)).toBe(JSON.stringify({}));
});
