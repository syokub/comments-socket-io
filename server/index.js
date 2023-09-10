const express = require("express");
const { users } = require("./lib/users");
const { listComments, createComment } = require("./lib/comments");
const app = express();

const http = require("http").Server(app);
const cors = require("cors");

const PORT = 7000;

app.use(cors());
app.use(express.json());

const io = require("socket.io")(http, {
  cors: {
    origin: "http://127.0.0.1:5173",
    "Access-Control-Allow-Origin": "*",

  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/comments", (req, res) => {
  const comments = listComments();
  res.json(comments);
});

app.post("/comments", async (req, res) => {
  const comment = createComment(req.body);
  io.emit("new-comment", { comment });
  res.json(comment);
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
