// Requiring path to so we can use relative routes to our HTML files
//const path = require("path");

//for Handlebars
module.exports = function(app) {
  app.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
  });
  app.get("/dashboard", (req, res) => {
    res.render("dashboard");
  });
  app.get("/sign-up", (req, res) => {
    res.render("sign-up");
  });
  app.get("/Post", (req, res) => {
    res.render("partials/post");
  });
  // app.get("/api/auth/signin", (req, res) => {
  //   res.redirect("/dashboard");
  // });
};
