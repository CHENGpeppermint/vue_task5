const { SM4 } = require('gm-crypto')
// let key = "86C63180C2806ED1F47B859DE501215B"

// 生成秘钥
let generate = () => {
  // key Cipher key(any string of 32 hexadecimal digits)

  return createHexRandom()
}

// 加密
let encrypt = (data, key) => {
  key = key || "86C63180C2806ED1F47B859DE501215B"
  let encrypted = SM4.encrypt(data, key, { outputEncoding: "base64" })
  console.log('加密后的结果：', encrypted);

  return encrypted
}

// 解密
let decrypt = (data, key) => {
  let decrypted = SM4.decrypt(data, key, { inputEncoding: 'base64', outputEncoding: 'utf8' })
  key = key || "86C63180C2806ED1F47B859DE501215B"
  console.log('解密后的结果：', decrypted);

  return decrypted
}

// 生成32个十六进制数字组成的任意字符串
function createHexRandom () {
  var num = "";
  for (i = 0; i <= 31; i++) {
    var tmp = Math.ceil(Math.random() * 15);

    if (tmp > 9) {
      switch (tmp) {
        case (10):
          num += "A";
          break;
        case (11):
          num += "B";
          break;
        case (12):
          num += "C";
          break;
        case (13):
          num += "D";
          break;
        case (14):
          num += "E";
          break;
        case (15):
          num += "F";
          break;
      }
    } else {
      num += tmp;
    }
    // if ((i == 7 || i == 11) || (i == 15 || i == 19)) {
    //   num += "-";
    // }
  }
  console.log("生成的秘钥key：" + num)
  return num;
}

module.exports = {
  encrypt,
  decrypt,
  generate
}