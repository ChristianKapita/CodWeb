const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const db = require("./models");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));

const exphbs = require("express-handlebars");
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs({ extname: "handlebars", defaultLayout: "", layoutsDir: "" })
);

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParse.json());

// app.get("/", (req, res) => {
//   //res.json({ message: "welcome to CodWeb App" });
//   res.sendFile(path.join(__dirname, "../public/login.html"));
// });

const PORT = process.env.PORT || 8080;
require("./routes/auth-routes")(app);
require("./routes/html-routes")(app);
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
