import Request from './request'

export default class loginService {
  static async login(data={}) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/Staff/loginStaff",
        data
      }).then(result =>{ 
        const { statusCode, data, message} = result
        if(statusCode === 200) {        
          resolve(data)
        } else {
          reject(message);
        }
      })
    })
  }
}