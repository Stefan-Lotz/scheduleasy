const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const ScheduleModel = require("./models/Schedule");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const UserMessageModel = require("./models/UserMessage");
const { Server } = require("socket.io");
const http = require("http");

const salt = bcrypt.genSaltSync(10);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGODB_URI);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  var passOk = "";
  password === ""
    ? (passOk = "")
    : (passOk = bcrypt.compareSync(password, userDoc.password));
  if (passOk) {
    jwt.sign(
      { username, id: userDoc._id },
      process.env.SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      }
    );
  } else {
    res.status(400).json("Wrong credentials!");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/schedule", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
      if (err) throw err;

      const { title, about, numPeriods, url, periods } = req.body;
      const periodsArray = JSON.parse(periods);

      const scheduleDoc = await ScheduleModel.create({
        title,
        about,
        numPeriods,
        cover: newPath,
        url,
        author: info.id,
        periods: periodsArray,
      });

      res.json(scheduleDoc);
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create schedule" });
  }
});

app.get("/schedule", async (req, res) => {
  res.json(
    await ScheduleModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
  );
});

app.get("/schedule/:url", async (req, res) => {
  const { url } = req.params;
  const scheduleDoc = await ScheduleModel.findOne({ url })
    .populate("author", ["username"])
    .populate("messages");
  res.json(scheduleDoc);
});

app.post("/schedule/:url/message", async (req, res) => {
  const { url } = req.params;
  const { text } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) return res.status(401).json("Invalid token");

    try {
      const schedule = await ScheduleModel.findOne({ url });
      if (!schedule) {
        return res.status(404).json("Schedule not found");
      }

      const newMessage = await UserMessageModel.create({
        text,
        author: info.id,
        schedule: schedule._id,
      });

      schedule.messages.push(newMessage._id);
      await schedule.save();

      io.emit("newMessage", { url, message: newMessage });

      res.json(newMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  });
});

app.put("/schedule/:url", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { url } = req.params;
    const { title, about, numPeriods, periods } = req.body;
    const { token } = req.cookies;
    let newPath;

    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json("Unauthorized");
      }

      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
      }

      const schedule = await ScheduleModel.findOne({ url });
      if (!schedule) {
        console.error("Schedule not found:", url);
        return res.status(404).json("Schedule not found");
      }

      if (schedule.author.toString() !== info.id) {
        console.error("Forbidden: User is not the author of the schedule");
        return res.status(403).json("Forbidden");
      }

      schedule.title = title || schedule.title;
      schedule.about = about || schedule.about;
      schedule.numPeriods = numPeriods || schedule.numPeriods;
      schedule.periods = periods ? JSON.parse(periods) : schedule.periods;
      if (newPath) schedule.cover = newPath;

      await schedule.save();
      res.json(schedule);
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json("Internal server error");
  }
});

app.get("/schedule/:url", async (req, res) => {
  try {
    const { url } = req.params;
    const schedule = await Schedule.findOne({ url });
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json(schedule);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/schedule/:url", async (req, res) => {
  try {
    const { url } = req.params;
    const { token } = req.cookies;

    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
      if (err) return res.status(401).json("Unauthorized");

      const schedule = await ScheduleModel.findOne({ url });
      if (!schedule) return res.status(404).json("Schedule not found");

      if (schedule.author.toString() !== info.id) {
        return res.status(403).json("Forbidden");
      }

      await ScheduleModel.deleteOne({ _id: schedule._id });
      res.json({ message: "Schedule deleted" });
    });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json("Internal server error");
  }
});

app.get("/user-schedules", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) return res.status(401).json("Invalid token");

    try {
      const schedules = await ScheduleModel.find({ author: info.id });
      res.json(schedules);
    } catch (error) {
      console.error("Error fetching user schedules:", error);
      res.status(500).json("Server error");
    }
  });
});

app.put("/schedule/:url/link", async (req, res) => {
  const { url } = req.params;
  const { linkedSchedule } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) return res.status(401).json("Invalid token");

    try {
      const schedule = await ScheduleModel.findOne({ url });
      if (!schedule) {
        return res.status(404).json("Schedule not found");
      }

      if (schedule.author.toString() !== info.id) {
        return res.status(403).json("Forbidden");
      }

      schedule.linkedSchedule = linkedSchedule;
      await schedule.save();

      res.json(schedule);
    } catch (error) {
      console.error("Error linking schedule:", error);
      res.status(500).json("Server error");
    }
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
