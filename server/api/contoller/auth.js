const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ msg: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.KEY);

    req.user = decoded; // attach decoded user info
    next();

  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
