const http = require("http");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  const searchParams = url.searchParams;

  const name = searchParams.get("hello");

  if (searchParams.has("hello")) {
    if (name === "") {
      response.statusCode = 400;
      response.statusMessage = "Error";
      response.header("Content-Type", "text/plain");
      response.write("Enter a name");
      response.end();
      return;
    }
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header("Content-Type", "text/plain");
    response.write(`Hello,${name}`);
    response.end();
    return;
  }

  if (name) {
    response.statusCode = 200;
    response.statusMessage = "ok";
    response.header = "Content-Type: text/plain";
    response.write(`Hello, ${name}.`);
    response.end();
    return;
  }

  if (request.url === "/?hello") {
    response.statusCode = 400;
    response.statusMessage = "Error";
    response.header = "Content-Type: text/plain";
    response.write(`Enter a name`);
    response.end();
    return;
  }

  if (request.url === "/?users") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }

  if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write("Hello world!");
    response.end();
    return;
  }

  response.statusCode = 500;
  response.statusMessage = "Internal Server Error";
  response.header = "Content-Type: text/plain";
  response.write("Internal Server Error");
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
