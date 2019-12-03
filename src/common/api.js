import request from "./request";
import { post } from "axios";

const host = process.env.APP_API ? process.env.APP_API : "http://45.77.174.252/api";

// =========================== USER ==============================
export const login = data => {
  return request({
    url: `${host}/auth/login`,
    method: "POST",
    data
  });
};

export const me = token => {
  return request({
    url: `${host}/auth/me`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const logout = () => {
  return request({
    url: `${host}/auth/logout`,
    method: "POST"
  });
};

export const changePassword = data => {
  return request({
    url: `${host}/auth/change-password`,
    method: "POST",
    data
  });
};
// =========================== GALLERY ==============================

export const getPhotos = (userId, params = {}) => {
  return request({
    url: `${host}/user/${userId}/photos`,
    method: "GET",
    params
  })
}

export const uploadPhotos = (images, userId) => {
  console.log(process.env.APP_API)
  const url = `${host}/user/${userId}/upload-image`;
  const formData = new FormData();
  images.map(image => {
    formData.append("image[]", image);
    return false;
  });
  formData.append("user_id", userId);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  return post(url, formData, config);
};
