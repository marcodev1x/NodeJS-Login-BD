const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Realize o login para iniciar!" });
  }
  try {
    const decoded = jwt.verify(token, "shhhhh");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Realize o login para iniciar!" });
  }
};

module.exports = auth;
