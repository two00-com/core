import { api, setOptions, apiOptions } from "../src";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

jest.mock("../lib/serverMonitor", () => ({
  serverMonitor: jest.fn(),
}));
const { serverMonitor } = require("../lib/serverMonitor");
serverMonitor.mockReturnValue({
  serverMonitor: {
    cpu: {},
    memory: {},
    discSpace: {},
  },
});

let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

test("api | test if object holds correct keys, and types", () => {
  const myApi = api();

  expect(myApi).toBeTruthy();

  expect(myApi.serverMonitor).toBeTruthy();
  expect(typeof myApi.serverMonitor).toBe("object");

  expect(myApi.serverMonitor.ping).toBeTruthy();
  expect(typeof myApi.serverMonitor.ping).toBe("function");

  expect(myApi.fetch).toBeTruthy();
  expect(typeof myApi.fetch).toBe("function");
});

test("api | call serverMonitor | 201", async () => {
  const myApi = api();
  mock.onPost("/rest/health-check/id").reply(201, "Created", {
    apiVersion: "0",
  });

  const response = await myApi.fetch(
    myApi.serverMonitor.ping("id", serverMonitor())
  );

  expect(response.ok).toBe(true);
  expect(response.status).toBe(201);
  expect(response.data).toBe("Created");
  expect(response.headers.apiVersion).toBe("0");
});

test("api | call serverMonitor | 403", async () => {
  const myApi = api();
  mock.onPost("/rest/health-check/id1").reply(403, "Forbidden", {
    apiVersion: "0",
  });

  const response = await myApi.fetch(
    myApi.serverMonitor.ping("id1", serverMonitor())
  );

  expect(response.ok).toBe(false);
  expect(response.status).toBe(403);
  expect(response.data).toBe("Forbidden");
  expect(response.headers.apiVersion).toBe("0");
});

test("api | call serverMonitor | 201 with update available", async () => {
  const onUpdateAvailable = jest.fn();

  setOptions({
    ...apiOptions,
    onUpdateAvailable,
  });

  const myApi = api();

  mock.onPost("/rest/health-check/id2").reply(201, "Created", {
    apiVersion: "1",
  });

  const response = await myApi.fetch(
    myApi.serverMonitor.ping("id2", serverMonitor())
  );

  expect(response.ok).toBe(true);
  expect(response.status).toBe(201);
  expect(response.data).toBe("Created");
  expect(response.headers.apiVersion).toBe("1");
  expect(onUpdateAvailable).toBeCalledTimes(1);
});

test("api | call serverMonitor | 201 with errors", async () => {
  const onError = jest.fn();

  setOptions({
    ...apiOptions,
    onError,
  });

  const myApi = api();

  mock.onPost("/rest/health-check/id3").reply(
    201,
    {
      errors: {
        e: 1,
        path: "path",
      },
    },
    {
      apiVersion: "1",
    }
  );

  const response = await myApi.fetch(
    myApi.serverMonitor.ping("id3", serverMonitor())
  );

  expect(response.ok).toBe(true);
  expect(response.status).toBe(201);
  expect(response.errors).toEqual({ e: 1, path: "path" });
  expect(response.headers.apiVersion).toBe("1");
  expect(onError).toBeCalledTimes(1);
});
