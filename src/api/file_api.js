import * as API from "./";

export default {
  remove: params => {
    console.log("delete");
    return API.DELETE("file/", params);
  },

  get: () => {
    return API.GET("file/");
  },

  search: params => {
    return API.GET("file/", params);
  }
};
