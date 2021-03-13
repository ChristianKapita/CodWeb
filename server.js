const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const db = require("./models");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));

const exphbs = require("express-handlebars");
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs({ extname: "handlebars", defaultLayout: "main" })
);

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(bodyParse.text());
app.use(cookieParser());

app.use(
  session({
    cookieName: "session",
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);
const PORT = process.env.PORT || 8080;
require("./routes/auth-routes")(app);
require("./routes/html-routes")(app);
require("./routes/post-routes")(app);
require("./routes/DisplayPost-routes")(app);
require("./routes/profile-posts")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
