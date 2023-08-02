import {
  AuthControllerLogInMutationBody,
  useAuthControllerLogIn,
} from "@/oapi-client/auth";
import axios from "axios";
import { useState } from "react";
import type { JWTToken } from "types/";

export function getToken() {
  return localStorage.getItem("accessToken");
}

export function useToken() {
  const [token, setToken] = useState(getToken());
  const refresh = () => {
    setToken(getToken());
  };

  return [token, refresh];
}

export function useLogin() {
  return useAuthControllerLogIn({
    mutation: {
      onSuccess: (res) => {
        const data: JWTToken = res.data;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
      },
    },
  });
}
