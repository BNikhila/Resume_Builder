const constructorMethod = (app) => {
  app.use(function (req, res, next) {
    let currenttime = new Date().toUTCString();
    let auth = "";
    if (req.session.username) {
      auth = "(Authenticated User)";
    } else {
      auth = "(Non-Authenticated User)";
    }
    console.log(`[${currenttime}]: ${req.method}\t${req.originalUrl}\t${auth}`);
    next();
  });

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;