const jwt = require('jsonwebtoken');	//引入jwt包
const fs = require('fs')
var private = fs.readFileSync('utils/modules/private.key')
var public = fs.readFileSync('utils/modules/public.key');

const time = '24h'

let sign = (data) => {
  /**
   * @name: 生成token
   * @param {
   *    *data:  要加密的数据
   *    *time:  过期的时间
   * }
   * @return {*token：加密信息}
   */
  return jwt.sign(data, private, { algorithm: 'RS256', expiresIn: time });
}

let verify = (token) => {
  /**
   * @name: 解析token
   * @param {*token:  要解密的token}
   * @return {
   *    *id:  用户id，便于其他接口使用
   *    *token: 用于作为判断token是否过期或者有效的标识
   * }
   */
  return new Promise((resolve, reject) => {
    jwt.verify(token, public, (error, data) => {
      if (error) {
        return resolve({ data: '', status: false, msg: 'Token令牌超时或被窜改' })
      }
      // console.log(data, '解析成功')

      return resolve({ data: data, status: true, msg: '令牌验证通过' })
    })
  })
}

module.exports = {
  sign,
  verify
}