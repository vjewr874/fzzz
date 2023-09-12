import Request from './request'

export default class FactoryReportService {
  static async summaryServicePackageReport (params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/Statistical/summaryServicePackageReport",
        data: params
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