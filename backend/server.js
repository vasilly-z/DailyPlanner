const express = require("express");
const cors = require("cors");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

const users = {
  "user1@some.com": "user1@some.com",
  "user2@some.com": "user2@some.com",
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (users[email] && users[email] === password) {
    const token = jwt.sign({ email }, "jwt_secret", { expiresIn: "1h" });
    req.session.token = token;
    res.json({ token });
  } else {
    res.status(401).json({ message: "Неверные данные" });
  }
});

app.get("/check-session", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.json({ valid: false });

  if (token === "guest") {
    res.json({ valid: true });
  } else {
    jwt.verify(token, "jwt_secret", (err) => {
      res.json({ valid: !err });
    });
  }
});

const schedule = {
  Понедельник: ["00:00", "24:00"],
  Вторник: ["00:00", "24:00"],
  Среда: ["00:00", "24:00"],
  Четверг: ["00:00", "24:00"],
  Пятница: ["00:00", "24:00"],
  Суббота: ["00:00", "24:00"],
  Воскресенье: ["00:00", "24:00"],
};

app.get("/schedule", (req, res) => {
  res.json(schedule);
});

app.post("/schedule", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const isAllowed = isCurrentTimeInSchedule(req.body);
  if (token === "guest" && isAllowed) {
    Object.assign(schedule, req.body);
    res.json({ message: "Расписание обновлено" });
  } else if (token === "guest" && !isAllowed) {
    res.status(403).json({ message: "Нет доступа в настоящее время" });
  } else {
    jwt.verify(token, "jwt_secret", (err) => {
      if (err) return res.status(403).json({ message: "Нет доступа" });
      Object.assign(schedule, req.body);
      res.json({ message: "Расписание обновлено" });
    });
  }
});
//проверка можно ли сейчас менять значения гостю
const isCurrentTimeInSchedule = (schedules) => {
  const now = new Date();
  const currentDay = now.toLocaleString("ru-RU", { weekday: "long" });
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const currentDayCase =
    currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

  if (!schedules[currentDayCase]) {
    //нет дня в списке
    console.log("false");
    return false;
  }

  const time = schedule[currentDayCase];
  const startTime = time[0].split(":").map(Number);
  const endTime = time[1].split(":").map(Number);
  const startTotalMinutes = startTime[0] * 60 + startTime[1];
  const endTotalMinutes = endTime[0] * 60 + endTime[1];

  return currentTime >= startTotalMinutes && currentTime <= endTotalMinutes;
};

app.listen(5000, () => console.log("Сервер запущен на порту 5000"));
