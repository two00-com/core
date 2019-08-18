import { setConfig, apiOptions } from "../src";
import { apiOptionsFixture } from "./fixtures/apiOptions";

test("setConfig | test if object holds correct keys, and types", () => {
  expect(setConfig).toBeTruthy();
  expect(typeof setConfig).toBe("function");
  expect(JSON.stringify(apiOptions)).toBe(JSON.stringify(apiOptionsFixture));

  setConfig({});

  expect(JSON.stringify(apiOptions)).toBe(
    JSON.stringify({
      config: {},
      onError: () => {},
      onUpdateAvailable: () => {},
    })
  );
});
