const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200; //Success
    res.setHeader("Content-type", "text/plain");
    res.write("HOME");
    res.end();
  }

  if (req.url === "/login") {
    res.statusCode = 200; //Success
    res.setHeader("Content-type", "text/plain");
    res.write("LOGIN");
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  //console.log("Server running at http://" + hostname + ":" + port + "/");
});
