var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var app = express();
const socket = require("socket.io");
const PORT = 5000;

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//
const io = socket(server);
let arr = [];
let users = [];
// tạo kết nối giữa client và server
io.on("connection", (socket) => {
  console.log("client connected on websocket");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on("users", function (data) {
    users.push(data)
  });
  console.log(users);
  socket.on("sendBoardData", function (data) {
    arr = data
    console.log(data)
  });
  socket.on('message', function(data){
    console.log(data)
  })
  socket.on('setBoard', function(size = 8){
    let board = []
    for (let i = 0; i < size; i++) {
        let tmp = []
        for (let j = 0; j < size; j++) {
            tmp[j] = 0
        }
        board[i] = tmp
    }
    console.log(board)
    arr = board
  })

  socket.emit('getBoard',arr)

  socket.on("join room", function (data) {
    console.log(data)
    //THam gia phòng  
    socket.join(data);
    socket.in(data).emit('connectToRoom', "You are in room no. "+data);
    socket.in(data).emit('usersPlaying', users);
  });
  socket.on("disconnect", () => {
    users.pop()
    console.log("thoat")
  });
});

module.exports = app;
