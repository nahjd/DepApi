const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = userAuth;
