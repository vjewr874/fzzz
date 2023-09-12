/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Request from './request';

export default class LoginService {
  static async Signin(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/loginByPhone',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }

  static async SigninByEmail(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/loginByEmail',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }

  static async SigninByUsername(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/loginUser',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }

  static async SigninGimolottByToken(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/loginByToken',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }
  static async requestPhoneOTP(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'OTPMessage/user/requestPhoneOTP',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message, error } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message, error });
        }
      });
    });
  }
  static async requestEmailOTP(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'OTPMessage/user/requestEmailOTP',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message, error } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message, error });
        }
      });
    });
  }
  static async verifyOtp(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'OTPMessage/user/confirmPhoneOTP',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message, error } = result;
        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message, error });
        }
      });
    });
  }

  static async verifyOtpByEmail(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'OTPMessage/user/confirmEmailOTP',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message, error } = result;
        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message, error });
        }
      });
    });
  }

  static async Register(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/registerUserByPhone',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message, error } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data, message });
        } else {
          return resolve({ isSuccess: false, message: error });
        }
      });
    });
  }

  static async RegisterByEmail(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/registerUserByEmail',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message, error } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data, message });
        } else {
          return resolve({ isSuccess: false, message: error });
        }
      });
    });
  }

  static async ForgotPass(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/forgotPasswordOTP',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }

  static async ChangeUserPassWord(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/changePasswordUser',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }
  static async setPassword(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'users/set-password',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }

  static async verifyAccount(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/user/checkExistingAccount',
        data,
      }).then((result = {}) => {
        const { statusCode } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true });
        } else {
          return resolve({ isSuccess: false });
        }
      });
    });
  }

  static async changePasswordViaEmailOTP(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/user/changePasswordviaEmailOTP',
        data,
      }).then((result = {}) => {
        const { statusCode, error, message } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, message });
        } else {
          return resolve({ isSuccess: false, error, message });
        }
      });
    });
  }
}
