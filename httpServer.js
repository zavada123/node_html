const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  
  let contentType = null;
  let extname = path.extname(filePath);
  extname ? true : filePath+= ".html";
  extname ? true : extname = ".html";

  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    default:
      contentType = "text/html";
      break;
  }

  console.log(filePath);
  console.log(contentType);

  fs.readFile(filePath, "utf-8", (err, data) => {
    res.writeHead(200, {
      "Content-Type": contentType
    });
    res.end(data);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Listening on port 3000");
});
