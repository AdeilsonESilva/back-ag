const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/schedule", (req, res) => {
  req.query.date = "2020-02-17 11:00:00";
  req.query.user = {
    name: "Adeilson"
  };
  data = [{ ...req.query }];

  // res.jsonp({ data: { ...req.query } });
  res.jsonp(data);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// server.use((req, res, next) => {
//   if (req.method === "POST") {
//     req.body.createdAt = Date.now();
//   }
//   // Continue to JSON Server router
//   next();
// });

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }

  if (req.method === "POST" && req.originalUrl === "/sessions") {
    req.body.token = "token";
    req.body.user = {
      provider: true,
      name: "Ade",
      avatar: { url: null }
    };
  }
  next();
});

// router.render = (req, res) => {
//   res.jsonp({
//     body: res.locals.data
//   });
// };

// In this example we simulate a server side error response
// router.render = (req, res) => {
//   res.status(500).jsonp({
//     error: "error message here"
//   });
// };

// Use default router
server.use(router);
server.listen(3333, () => {
  console.log("JSON Server is running");
});
