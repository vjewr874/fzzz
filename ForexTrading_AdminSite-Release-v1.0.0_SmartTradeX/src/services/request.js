// @ts-nocheck
import axios from "axios";
import { HOST } from "./../constants/url";
import { toast } from "react-toastify";
import { getQueryString } from "../helper/common";

function send({
  method = "get",
  path,
  data = null,
  query = null,
  headers = {},
  newUrl,
}) {
  return new Promise((resolve) => {
    let url = HOST + `${path}${getQueryString(query)}`;
    if (newUrl) {
      url = `${newUrl}${getQueryString(query)}`;
    }
    let token = window.localStorage.getItem("accessToken");

    if (token) {
      const newToken = token.replace(/"/g, "");
      headers.Authorization = `Bearer ${newToken}`;
    }
    axios({
      method,
      url,
      data,
      headers,
    })
      .then((result) => {
        const data = result.data;
        return resolve(data);
      })
      .catch((error) => {
        const { response = {} } = error;

        const result = response.data ? response.data : null;
        if (!result) {
          toast.warn(
            "Phát sinh lỗi hệ thống. Liên hệ tổng đài để biết thêm chi tiết."
          );
        } else {
          const { statusCode, message: data, error } = result;
          if (statusCode === 505) {
            toast.warn("Không có quyền truy cập");
            return resolve(result);
          } else if (
            statusCode === 401 &&
            data === "Expired token received for JSON Web Token validation"
          ) {
            toast.warn("Hết hạn truy cập");
            logout();
          } else if (
            statusCode === 400 &&
            data ===
              'child "password" fails because ["password" length must be at least 6 characters long]'
          ) {
            toast.warn("Mật khẩu phải trên 6 ký tự");
            return resolve(result);
          } else if (
            (statusCode === 401 && data === "Unauthorized") ||
            (statusCode === 403 && data === "InvalidToken")
          ) {
            toast.warn("Không có quyền truy cập");
            logout();
          } else if (statusCode === 500) {
            if (error === "duplicate username") {
              toast.warn("Tài khoản hoặc email đã tồn tại");
            } else if (error === "failed to update user") {
              toast.warn("Vui lòng xem lại thông tin");
            } else if (error === "failed to login staff") {
              toast.warn("Sai tên người dùng hoặc mật khẩu, vui lòng nhập lại");
            } else if (error === "can not find user") {
              toast.warn("Không tìm thấy người dùng");
            } else if (error === "DUPLICATED_USER_PHONE") {
              toast.warn("Số điện thoại đã tồn tại");
            } else if (error === "DUPLICATED_USER_EMAIL") {
              toast.warn("Email đã tồn tại");
            } else if (error === "DUPLICATED_USER") {
              toast.warn("Số điện thoại hoặc email đã tồn tại");
            } else if (data === "account is locked") {
              toast.warn("Tài khoản đã bị khóa");
            } else if (data === "email is already exist") {
              toast.warn("Email đã tồn tại");
            } else if (data === "start date and end date is so far") {
              toast.warn("Chọn khoảng thời gian không quá 12 tháng");
            } else if (data === "phone number is already exist") {
              toast.warn("Số điện thoại đã tồn tại");
            } else if (error === "can not insert staff") {
              toast.warn("admin không tạo được tài khoản");
            } else if (data === "username or password is wrong") {
              toast.warn(
                "Tài khoản hoặc mật khẩu không đúng, vui lòng nhập lại"
              );
            } else {
              toast.warn(
                "Phát sinh lỗi hệ thống. Liên hệ tổng đài để biết thêm chi tiết."
              );
            }
            return resolve(result);
          } else if (statusCode) {
            toast.warn(
              data ||
                "Phát sinh lỗi hệ thống. Liên hệ tổng đài để biết thêm chi tiết."
            );
            return resolve(result);
          } else {
            return resolve(result.data);
          }
        }
      });
  });
}

function logout() {
  setTimeout(() => {
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.localStorage.clear();
    window.location.href = "/";
  }, 1000);
}

export default {
  send,
};
