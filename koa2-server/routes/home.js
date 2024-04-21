const router = require('koa-router')()
// 引入jwt
const jwt = require('../utils/jwt.js')

const {
  insertOne,
  findOne,
  findMany,
  deleteOne,
  updateOne,
  uploadFile,
  executeSql
} = require('../models/common.js')
// 文件系统
const path = require('path');
const fs = require('fs');

// 插入一条数据
router.post('/insertOne', async (ctx, next) => {
  const data = ctx.request.body
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

  // console.log('请求数据：', data)
  try {
    let rest = await insertOne(data.gether, data.data)
    console.log('插入成功')

    ctx.body = {
      code: 200,
      data: rest,
      msg: '插入成功！'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      data: error,
      msg: '插入失败！'
    }
  }
})

// 查询一条数据
router.post('/findOne', async (ctx, next) => {
  const data = ctx.request.body
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

  console.log('请求数据：', data)
  try {
    let rest = await findOne(data.gether, data.data)
    // console.log('查询信息成功：', rest)
    console.log('查询信息成功')

    ctx.body = {
      code: 200,
      data: rest,
      msg: "获取信息成功！"
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      data: error,
      msg: '获取信息失败！'
    }
  }
})

// 查询多条数据
router.post('/findMany', async (ctx, next) => {
  //设置允许跨域
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

  const data = ctx.request.body
  // console.log('请求数据：', data)

  try {
    let rest = await findMany(data.gether, data.data)
    console.log('查询列表成功')
    ctx.body = {
      code: 200,
      data: rest,
      msg: '获取列表成功！'
    }
    // console.log(rest)
  } catch (error) {
    console.log('获取列表失败: ', error)
    ctx.body = {
      code: 500,
      data: error,
      msg: '获取列表失败！'
    }
  }
})

// 删除一条数据
router.post('/deleteOne', async (ctx, next) => {
  //设置允许跨域
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

  const data = ctx.request.body

  console.log('请求数据：', data)

  try {
    let rest = await deleteOne(data.gether, data.data)
    ctx.body = {
      code: 200,
      msg: '删除成功!'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      data: error,
      msg: '删除失败！'
    }
  }
})

// 更新一条数据
router.post('/updateOne', async (ctx, next) => {
  //设置允许跨域
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

  const data = ctx.request.body

  console.log('请求数据：', data)

  try {
    let rest = await updateOne(data.gether, data.data)
    ctx.body = {
      code: 200,
      msg: '更新成功！'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      data: error,
      msg: '更新表失败！'
    }
  }
})

// 文件上传
router.post('/uploadFile', async (ctx, next) => {
  //设置允许跨域
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

  // console.log('ctx.request');
  // console.log(ctx.request.files);

  const file = ctx.request.files[0];
  const fileinfo = fs.readFileSync(file.filepath);
  const name = `files_${new Date().getTime()}_${file.filename}`;
  const target = path.join(this.config.baseDir, `app/public/upload/${name}`);
  try {
    await fs.writeFileSync(target, fileinfo);
  } catch (error) {
    throw error;
  } finally {
    await fs.unlink(file.filepath, err => {
      if (err) {
        throw err;
      }
      console.log('删除缓存文件:' + file.filepath + '成功！');
    });
  }
  let pathId = target.slice(target.indexOf('public\\upload'));
  let http = 'http://127.0.0.1:3011/';  // 文件访问地址
  ctx.body = { code: 200, msg: '上传成功!', data: http + pathId, file, newFileName: name };
})

// 执行sql
router.post('/executeSql', async (ctx, next) => {
  //设置允许跨域
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

  const data = ctx.request.body

  // console.log('请求数据：', data)

  try {
    let rest = await executeSql(data.gether, data.data)
    ctx.body = {
      code: 200,
      data: rest,
      msg: '执行成功！'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      data: error,
      msg: '执行失败！'
    }
  }
})

// token验证
async function verifyToken (req) {
  const { token } = req.headers
  let response = await jwt.verify(token)
  return response
}


module.exports = router