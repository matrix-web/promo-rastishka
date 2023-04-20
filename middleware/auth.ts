import { defineNuxtRouteMiddleware, navigateTo } from "#imports";
import { useMainStore } from "~/store";
import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware((to, from) => {
  // const store = useMainStore();
  const token = Cookies.get("token");

  if (!token) {
    return navigateTo("/");
  }
});
