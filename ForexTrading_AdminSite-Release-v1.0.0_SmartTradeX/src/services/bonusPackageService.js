import Request from './request'

export default class BonusPackageService {
  static async findBonusPackage(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentServiceBonusPackage/find",
        data:params
      }).then(result =>{ 
        const { statusCode, data,message} = result
        if(statusCode === 200) {
          resolve(data)
        } else {
          reject(message)
        }
      })
    })
  }
}