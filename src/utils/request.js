import axios from "axios";

const service = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    config.headers["Content-type"] = "application/json; charset=UTF-8";

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    //当服务器成功返回数据时（状态码在 200 到 299 之间）
    console.log(response);

    return response; //传递给下游的 .then() 或 await
  },
  (error) => {
    //请求失败（如 HTTP 状态码是 4xx 或 5xx，或者网络错误）
    console.log(error);

    return Promise.reject(error); //继续传递给下游的 catch 处理
  }
);

export default service;
