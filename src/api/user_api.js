import * as API from "./";

export default {
  remove: params => {
    console.log("delete");

    return API.DELETE("user/", params);
  },
  login: params => {
    return API.GET("user/login/", params);
  },

  add: params => {
    return API.POST("user/", params);
  },

  update: params => {
    return API.UPDATE("user/", params);
  },

  get: () => {
    return API.GET("user/");
  },

  search: params => {
    return API.GET("user/", params);
  }
};
