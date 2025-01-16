import axios, { AxiosError } from "axios";

type TokensResponseType = {
  accessToken: string;
  refreshToken: string;
};

type MessageResponseType = {
  message: string;
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    // 1. 이전 요청 설정을 보관한다
    const prevConfig = error.config;
    // 2. 통행증을 재발급 받는다
    const refreshToken = localStorage.getItem("refreshToken") as string;
    const { accessToken, refreshToken: newRefreshToken } = await refresh(
      refreshToken
    );
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    // 3. 이전 요청 설정에 통행증을 추가해서 다시 요청한다.
    return axiosInstance(prevConfig!);
  }
);

export const login = (username: string) => {
  return axiosInstance
    .post("/login", {
      username,
    })
    .then<TokensResponseType>((res) => res.data);

  //   return fetch("http://localhost:3000/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username,
  //     }),
  //   }).then<TokensResponseType>((res) => res.json());
};

export const resource = () => {
  return axiosInstance
    .get("/resource")
    .then<MessageResponseType>((res) => res.data);

  //   return fetch("http://localhost:3000/resource", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }).then<MessageResponseType>((res) => res.json());
};

export const refresh = (refreshToken: string) => {
  return fetch("http://localhost:3000/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  }).then<TokensResponseType>((res) => res.json());
};
