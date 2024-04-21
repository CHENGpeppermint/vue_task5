const router = require('koa-router')()
const path = require("path");
const fs = require("fs");
const { writeFileSync, readFileSync, isFileExisted, unlinkSync } = require('../utils/file')

// 引入jwt
const jwt = require('../utils/jwt.js')

// 引入svg-captcha
const svgCaptcha = require("svg-captcha");
const {
  insertOne,
  findOne,
  findMany,
  deleteOne,
  updateOne,
  uploadFile,
  executeSql
} = require('../models/common.js')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  // 生成验证码
  const captcha = svgCaptcha.create({
    size: 3, // 字符数
    // ignoreChars: "zxcvbnmasdfghjklqwertyuiop", // 过滤字符
    noise: 3, // 干扰线条数
    color: true,
    background: "#fff", // 背景颜色
  });

  //设置允许跨域
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")
  console.log('验证码：', captcha.text)

  // captcha 是个对象，text是验证码文字，data是验证码
  ctx.body = {
    code: 200,
    msg: '获取验证码成功！',
    data: captcha
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/filelist', async (ctx, next) => {
  try {
    const authHeader = ctx.request.header.token

    //设置允许跨域
    ctx.set('Access-Control-Allow-Origin', "*")
    ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

    // 验证 JWT
    if (!await verifyToken(ctx))
      return ctx.body = { status: 401, msg: '身份验证失败，请重新登录！', data: '' }

    let data = []
    let new_path = path.join(__dirname, "../public/", 'upload_list.txt')
    if (isFileExisted(new_path) == "existed") {
      data = JSON.parse(readFileSync(new_path))
    }

    ctx.body = {
      code: 200,
      msg: '获取文件列表成功！',
      data
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '获取文件列表异常！' + error
    }
  }
})

// 删除文件
router.post('/delfile', async ctx => {
  try {
    const authHeader = ctx.request.header.token
    let params = { ...ctx.request.body }
    // console.log('删除文件参数：', params)
    console.log('token:', authHeader)

    //设置允许跨域
    ctx.set('Access-Control-Allow-Origin', "*")
    ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

    // 验证 JWT
    if (!await verifyToken(ctx))
      return ctx.body = { status: 401, msg: '身份验证失败，请重新登录！', data: '' }

    let data = []
    // let new_path = path.join(__dirname, "../public/", 'upload_list.txt')
    let file_path = path.join(__dirname, "../public/", params.fileid)

    // if (isFileExisted(new_path) == "existed") {
    //   data = JSON.parse(readFileSync(new_path))
    // }

    let new_data = []
    new_data = data.filter(item => {
      return item.fileid != params.fileid
    });
    // console.log('写入文件列表：', JSON.stringify(data))
    // writeFileSync(new_path, JSON.stringify(new_data))

    await deleteOne('t_file_list', { fileid: params.fileid })
    unlinkSync(file_path)

    ctx.body = {
      code: 200,
      msg: '删除成功！',
    }

  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '删除异常！' + error
    }
  }
})

// 处理文件上传路由
router.post('/upload', async ctx => {
  try {
    const authHeader = ctx.request.header.token
    console.log('token:', authHeader)

    //设置允许跨域
    ctx.set('Access-Control-Allow-Origin', "*")
    ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

    // 验证 JWT
    if (!await verifyToken(ctx))
      return ctx.body = { status: 401, msg: '身份验证失败，请重新登录！', data: '' }

    const img = ctx.request.files.file;

    if (!img) {
      ctx.body = {
        code: 500,
        msg: '请选择上传文件！',
      }
      return
    }


    const SaveInfo = generateUploadPath(img.name);
    let filename = img.name
    let filesize = img.size;
    let filetype = img.type;
    let fileid = SaveInfo.name

    saveImgToUpload(img, SaveInfo.path);
    // saveImgToList({ filename, filesize, filetype, fileid })
    await insertOne('t_file_list', { filename, filesize, filetype, fileid })

    ctx.body = {
      code: 200,
      msg: '上传成功！',
      filePath: SaveInfo.path
    }

  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '上传异常！' + error
    }
  }
})


// router.post('/upload', async ctx => {
//   try {
//     const authHeader = ctx.request.header.token
//     console.log('token:', authHeader)

//     //设置允许跨域
//     ctx.set('Access-Control-Allow-Origin', "*")
//     ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

//     // 验证 JWT
//     if (!await verifyToken(ctx))
//       return ctx.body = { status: 401, msg: '身份验证失败，请重新登录！', data: '' }

//     const img = ctx.request.files.file;

//     if (!img) {
//       ctx.body = {
//         code: 500,
//         msg: '请选择上传文件！',
//       }
//       return
//     }


//     const SaveInfo = generateUploadPath(img.name);
//     let filename = img.name
//     let filesize = img.size;
//     let filetype = img.type;
//     let fileid = SaveInfo.name

//     saveImgToUpload(img, SaveInfo.path);
//     saveImgToList({ filename, filesize, filetype, fileid })

//     ctx.body = {
//       code: 200,
//       msg: '上传成功！',
//       filePath: SaveInfo.path
//     }

//   } catch (error) {
//     ctx.body = {
//       code: 500,
//       msg: '上传异常！' + error
//     }
//   }
// })

function generateUploadPath (name) {
  let new_name = createImgName(name);
  let json = { "path": new_name, name: new_name }
  return json
}

function createImgName (name) {
  return Date.now() + "_" + name;
}

// saveImgToList()
function saveImgToList (params) {
  // const { filename, filesize, filetype, fileid } = params

  let new_path = path.join(__dirname, "../public/", 'upload_list.txt')
  let data = []
  if (isFileExisted(new_path) == "existed") {
    data = JSON.parse(readFileSync(new_path))
  }
  data.push(params)
  // console.log('写入文件列表：', JSON.stringify(data))
  writeFileSync(new_path, JSON.stringify(data))
}

function saveImgToUpload (img, uploadPath) {
  const readStream = fs.createReadStream(img.path);
  const savePath = path.join(__dirname, "../public/", uploadPath);
  console.log('文件写入路径 savePath:', savePath)
  const writeStream = fs.createWriteStream(savePath);
  readStream.pipe(writeStream);

  // readStream.on('error', (err) => {
  //   console.error('读取文件时出错:', err);
  //   writeStream.close();
  // });

  // writeStream.on('error', (err) => {
  //   console.error('写入文件时出错:', err);
  //   writeStream.close();
  // });

  // // 确保在所有数据都被写入后再进行后续操作
  // writeStream.on('finish', () => {
  //   console.log('文件写入成功');
  //   writeStream.close();
  // });
}

router.post('/login', async (ctx, next) => {
  let data = { ...ctx.request.body }
  // console.log('登录参数：', data)

  //设置允许跨域
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

  let state = false

  let rest = { code: 200, msg: '登录成功！' }

  let User = await findMany('t_user_list', {})

  for (let index = 0; index < User.length; index++) {
    const item = User[index];

    if (item.username == data['username'] && item.pwd == data['pwd']) {
      state = true

      const token = jwt.sign({ uId: data['username'] })
      // console.log('token：', token)
      rest['token'] = token;
      rest['username'] = data['username'];
      break;
    }
  }
  if (!state) {
    rest = {
      code: 500,
      msg: '用户名或密码错误！',
      data: '登录失败！'
    }
  }

  ctx.body = rest
})

// token验证
async function verifyToken (req) {
  const { token } = req.headers
  let response = await jwt.verify(token)
  return response
}

module.exports = router
