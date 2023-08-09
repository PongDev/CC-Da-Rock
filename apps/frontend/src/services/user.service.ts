import {
  authControllerLogIn,
  AuthControllerLogInMutationBody,
  authControllerRefresh,
  useAuthControllerLogIn,
} from "@/oapi-client/auth";
import axios from "axios";
import { useMemo, useState } from "react";
import type { JWTToken, JWTPayload } from "types/";
import jwt_decode from "jwt-decode";

export async function setup() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      delete axios.defaults.headers.common["Authorization"];
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const decoded: JWTPayload = jwt_decode(token);
    if (!decoded.exp) {
      throw new Error("Invalid jwt token: missing exp");
    }

    // set a timeout to refresh the token a minute before it expires
    const timeout = decoded.exp * 1000 - Date.now() - 60 * 1000;
    console.log("token expires in", timeout);
    await new Promise((resolve) => setTimeout(resolve, timeout));
    console.log("refreshing token");
    const res = await authControllerRefresh({
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
      },
    });
    const data: JWTToken = res.data;
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.accessToken}`;
  }
}

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("accessToken");
}

export function getDecodedToken(): JWTPayload | null {
  const token = getToken();
  if (!token) {
    return null;
  }
  return jwt_decode(token);
}

export function getRefreshToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("refreshToken");
}

export function useToken() {
  const [token, setToken] = useState(getToken());
  const refresh = () => {
    setToken(getToken());
  };

  return [token, refresh] as const;
}

export function useDecodedToken() {
  const [token, refresh] = useToken();
  const decodedToken = useMemo(() => {
    if (!token) {
      return null;
    }
    return jwt_decode<JWTPayload>(token);
  }, [token]);
  return [decodedToken, refresh] as const;
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

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  delete axios.defaults.headers.common["Authorization"];
}
