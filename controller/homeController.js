var login = false;

module.exports.home = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render("home", {
      title: "Todo App",
      msg: "Todo App Using Node Express Mongo Db",
    });
  } else {
    return res.render("login", {
      title: "Login || Todo App",
      heading: "Login Form",
    });
  }
};
