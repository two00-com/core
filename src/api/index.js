import { inspect } from "util";
import axios from "axios";

import { serverMonitor } from "./serverMonitor";

export let apiOptions = {
  config: {
    apiVersion: "0",
    api: {
      enableMonitors: true,
      timeout: 3000,
      url:
        /* istanbul ignore next */
        process.env.NODE_ENV === "production"
          ? "https://api.two00.xyz"
          : "http://localhost:2017",
      routes: {
        serverMonitor: {
          healthCheck: "/rest/health-check",
        },
      },
    },
  },
  onError: () => {},
  onUpdateAvailable: () => {},
};

const setOptions = options => {
  apiOptions = options;
};

const setConfig = config => {
  apiOptions = {
    ...apiOptions,
    config,
  };
};

/* istanbul ignore next */
const log = (options, response, error) => {
  if (options.config.api.enableMonitors) {
    if (error) {
      console.error("Error:");
      console.error(error);
    }

    console.info("Response:");
    console.info(inspect(response));
  }
};

const api = (options = apiOptions) => {
  const axiosInstance = axios.create({
    baseURL: options.config.api.url,
    timeout: options.config.api.timeout,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    serverMonitor: serverMonitor(axiosInstance, options),
    async fetch(apiFn) {
      const startResponse = new Date().getTime();
      let response;

      try {
        response = await apiFn;
      } catch (err) {
        const { response: responseData, ...rest } = err;
        response = { ok: false, ...responseData, ...rest };
        log(options, response, err);
        return response;
      }

      const endResponse = new Date().getTime();
      let responseData = {};

      const apiVersionServer = response.headers.apiVersion;
      const apiVersionShouldBe = options.config.apiVersion;

      if (apiVersionServer && apiVersionServer !== apiVersionShouldBe) {
        options.onUpdateAvailable();
      }

      responseData = response.data;
      response.errors = responseData.errors || {};
      response.ok = response.status >= 200 && response.status <= 299;
      response.duration = endResponse - startResponse;

      if (
        typeof response.errors === "object" &&
        response.errors.constructor === Object &&
        Object.keys(response.errors).length !== 0
      ) {
        options.onError(response.errors);
      }

      log(options, response);

      return response;
    },
  };
};

export { api, setConfig, setOptions };
