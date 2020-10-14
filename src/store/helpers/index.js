import axios from "axios";

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BE_URL_API,
});

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === "users/refreshToken"
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axios
        .post(
          `${process.env.REACT_APP_BE_URL_API}users/refreshToken`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            // sessionStorage.setItem("accessToken", res.data.accessToken);

            return Promise.resolve(res);
          }
        });
    }

    return Promise.reject(error);
  }
);

export default authAxios;