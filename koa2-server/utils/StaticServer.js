let path = require("path");
let fs = require("fs");
let mime = require("./mime.json");

function readFile (req, res, rootPath) {
  let filePath = path.join(rootPath, req.url);
  // console.log(filePath);
  let extName = path.extname(filePath);
  // console.log(ext);
  let type = mime[extName];
  // console.log(type);
  if (type) {
    if (type.startsWith('text')) {
      type += "; charset=utf-8;";
    }
    res.writeHead(200, { "Content-Type": type });
    fs.readFile(filePath, function (err, content) {
      if (err) {
        res.end("Server Error");
      }
      res.end(content);
    });
  } else {
    res.end();
  }
}
exports.StaticServer = readFile;