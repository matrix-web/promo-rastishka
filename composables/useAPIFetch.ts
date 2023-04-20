import { useFetch, useRuntimeConfig } from "#app";
import Cookies from "js-cookie";

type useFetchType = typeof useFetch;

// wrap useFetch with configuration needed to talk to our API
export const useAPIFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig();
  const token = Cookies.get("token");

  // modify options as needed
  options.headers = {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  };
  options.baseURL = config.public.NUXT_BASE_API_URL;
  // options.query = { param1, param2: 'value2' }
  return useFetch(path, options);
};
