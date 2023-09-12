import Request from './request'

export default class WalletRecordHistory {
  static async findWalletRecordHistory(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/WalletRecord/find",
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