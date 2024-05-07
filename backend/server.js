const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket);

  console.log("Socket ready to get connected.");

  socket.on("chat", (payload) => {
    console.log(payload);
    io.emit("chat", payload);
  });
});

// Do not do this
// app.listen(5000, () => {
//   console.log("Server is listening");
// });

server.listen(5000, () => {
  console.log("Server is listening at port 5000");
});
