const NodeRSA = require('node-rsa');
// const fs = require('fs')
// var priKey = fs.readFileSync('utils/modules/private.key')
// var pubKey = fs.readFileSync('utils/modules/public.key');

let pubKey = "-----BEGIN PUBLIC KEY-----" +
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg+B/+AKU62nDXCWVtn2F" +
  "9GmOsyYS9WuDmS7WiheYoTxr4rzFOhGxJ7lnMlLMyT023AAy5lphxsQm+saqMpnX" +
  "j27tbE//YXBxS+HkwShG98YvZLHyp7/TCWcDe12XlslJmcO8YpqtLkHEQ7om/WX2" +
  "KEgjBdPx6NVPmbI2lqxRQ0oExqoLgfylpV6ZEeKrXES1Y6MsBASfcaG2RcXi1HNU" +
  "Kaxwxv9pZrSgCqKK+9KzUs5QYINDF/EJy6/AT9NwAfhz3CiglP5Qg8LHZpvJ3Gx2" +
  "bxJXL8VhwaHt7hCXcHOywRku82UC6jwrpFzOXqReYE+bQertfYO3djGWWjiRunop" +
  "OwIDAQAB" +
  "-----END PUBLIC KEY-----";
let priKey = "-----BEGIN PRIVATE KEY-----" +
  "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCWjvClzyYYf5q2" +
  "9eQiqaLpSpSnjysW2p6KLXM34mteqI+BOVowska4PSQFE20cIcuh7uBKBtNxkA7p" +
  "E1byToY6AqrEuT9KLgplCcO3SmgFLHu3rm7KeNniULbYgsq+9BxYnvXR/PIXQYN/" +
  "sOOx6iYV6sv1ydstL2QYnkAEnFxSXVUrE0Get/LBTECfU80L7uLkfxTjsdUvZLL2" +
  "dFsX6sZIPGCS9H86Ng3eCK6PHHaj0iuGmVgkgbaPjE0QxmzkxDs4KxlF8iwSi8Jb" +
  "R2jgUMhfY/t+l54KcaXgESzZNO0mlhxmoXYjBhdeDkAAaS/NTUN+M7cMFE1PNI/D" +
  "wA9HTq0dAgMBAAECggEABzKMJJETlCY9gjOdFV8gr6BmHOCGQdBvtdFYabqEQYEz" +
  "Yw0X164eHV6m4ys7kxW2g2ZFCKTs5MfrPo8zH+BLIGjSOxdUBDrROmVOGuwOrvii" +
  "bXSETV+bousS4qTWBmzrEf1/aOt7s0rpe2g8alv0OCYCXByrQqy6T0b5bn7/FtzW" +
  "iSJCLX2H/tlxVSpQmGCDQIAX1OCmzZzcG0WBqFF4hd/ccifsMi0eiYW6WtsQgIRJ" +
  "tiWINJA++BZaucvWGPw5UYuhmyMy+VOU0h2vpdpkyvgRfnYVJpSlDzSizXM/rTZK" +
  "yHl/Bz04JYObMJ5+QZYB74aF6AxiOYeVUZA0NziD7QKBgQDVBRJh6bA1ZezcwtBa" +
  "l25lxJb9w7NiMJv8TE130jW8QZQzQEoZTtmq8otvyfzdeDDqDhGMi8djnJ2qaHh3" +
  "UZiTx5ZYXz2gws0Y5ChP9Og0YVd89SqaC8DIs37Np2KPuYBcM86umPbfGwVRioeV" +
  "/BXVWKZjxaCdqixuQrBM8H/5hwKBgQC075nPoXGD9v702TEvEZ98y/YeEqK2yyub" +
  "R+KqQKFxCP7Dq1+anWIMQQTQP9Gd8aHkCjNw48h/iSwD9nSy6dblJnk0YKI7Wvm6" +
  "E80pIs4XhGSKbF8TI48llQXpCKKireJa5WueisZNXXKbllip6Gad0n8Sg3dXPZn/" +
  "QV26tI09OwKBgAoroNIN7zzNbf6oSnxYyIuRVEgvZMwmV/w2xGgZIDmpw+Kiiicl" +
  "LZ1M0T14HluQln1GSK42KkHmQ1zUehPwUGGV4Oa9PVsEkfhDRG102vVNRHkR14Pd" +
  "Vcn/T+mPuVP1XlyImLCbWwYR6zIWdBzEGWLDRcZztBRzAIYPJw21WdbXAoGAfjry" +
  "2fJOGb0GHpgwQiBPXmeFa3Gg51pTL+A0+IZim1OlOamj52CJePcbfpYnjcN4KHod" +
  "bVLdHGz8sj8NJ40QiYoP4UTRqgtMUk9iQKKxmaKZ6iC1K8sRIS0YlH2byVb6pmOM" +
  "c21p76uUO4vmi5NBlDW4xZfGeKzXdUeLNqikKOUCgYBBoyEma0UP1eEpqgexNIpe" +
  "JFDftN+48RLWlgjmn0FAEeuGF+TFXAshb6kla4/ItxXmj7ElUf4jqteHZ25u5+9R" +
  "ICH52u6iCiKX4rUtMI4JoU3KRXT6mvmSZMS0DotMRZxRCEjGFf9O0+sQvLdOjKNm" +
  "ztzaRAx5IT+LhMh7c/FhZA==" +
  "-----END PRIVATE KEY-----";

// 生成秘钥
let generate = (digit) => {
  // digit = 2048;
  var key = new NodeRSA({ b: digit });//生成512位秘钥
  var pubkey = key.exportKey('pkcs8-public');//导出公钥
  var prikey = key.exportKey('pkcs8-private');//导出私钥
  let json = { pubkey, prikey }

  console.log(prikey, '生成的私钥')
  console.log(pubkey, '生成的公钥')
  return json
}
// 加密
let encrypt = (data) => {
  var key = new NodeRSA();
  key.importKey(pubKey, "pkcs8-public-pem");
  let encryptData = (typeof (data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) ? JSON.stringify(data) : data
  const encrypted = key.encrypt(encryptData, 'base64');

  console.log('encrypted: ', encrypted);
  return encrypted
}

// 解密
let decrypt = (data) => {
  var key = new NodeRSA();
  key.importKey(priKey, "pkcs8-private");
  const decrypted = key.decrypt(data, 'utf8');
  console.log('decrypted: ', decrypted);

  return decrypted
}

// 加签
let sign = (data) => {
  // pubKey = new NodeRSA(pubKey, 'pkcs8-public');//导入公钥
  // priKey = new NodeRSA(priKey, 'pkcs8-private');//导入私钥

  const a_private_key = new NodeRSA(priKey);
  const sign = a_private_key.sign(data, 'base64', 'utf8');

  console.log('A 私钥加签:', sign);
  console.log(sign.length)
}

// 验签
let verified = (data) => {

}

module.exports = {
  generate,
  encrypt,
  decrypt,
  sign,
  verified
}