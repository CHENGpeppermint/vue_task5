// 声明路径
const path = require('path')
// 声明文件
const fs = require('fs')

// ----------------------------------------------------------- 本地文件存储方法 -----------------------------------------------------------

// 文件异步写入
// eslint-disable-next-line no-unused-vars
function writeFile (file, stream, callback) {
  fs.writeFile(file, stream, (err) => {
    if (err) {
      return err
    }
    callback()
  })
}
// 文件异步读取
// eslint-disable-next-line no-unused-vars
function readFile (file, callback) {
  fs.readFile(file, function (err, data) {
    if (err) {
      return console.error(err);
    }
    callback(data)
  });
}

// 判断文件是否存在（弃用）
// function isFileExisted (offPath) {
//   return new Promise(function (resolve, reject) {
//     fs.access( offPath), (err) => {
//       if (err) {
//         // reject(err.message);
//         resolve('noExisted')
//       } else {
//         resolve('existed');
//       }
//     })
//   })
// }

// // 检查文件是否存在于当前目录中。（弃用）
// fs.access(file, fs.constants.F_OK, (err) => {
//   console.log(`${file} ${err ? '不存在' : '存在'}`);
// });

// 同步删除文件
module.exports.unlinkSync = function unlinkSync (offPath) {
  fs.unlinkSync(offPath);
}

// 同步读取文件
module.exports.readFileSync = function readFileSync (readPath) {
  return fs.readFileSync(readPath, 'utf-8');
}

// 同步写入文件
module.exports.writeFileSync = function writeFileSync (writePath, stream) {
  fs.writeFileSync(writePath, stream);
}

// 同步获取读写权限、是否存在验证
module.exports.isFileExisted = function isFileExisted (offPath) {
  try {
    fs.accessSync(offPath, fs.constants.R_OK | fs.constants.W_OK);
    return 'existed'
  } catch (err) {
    return 'noExisted'
    // console.error('无权访问');
  }
}

// 递归删除指定文件夹
module.exports.deleteFolder = function deleteFolder (path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

// 同步获取指定目录下文件个数
function readdirSync (pathDir) {
  return fs.readdirSync(pathDir)
}
