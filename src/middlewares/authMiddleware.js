const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(400).send({ success: false, message: "Provide token" });
  }

  try {
    const decodedToken = jwt.verify(token, "to-do-list-application");

    req.user = decodedToken;

    next();
  } 
  catch (error) {
    res.status(401).send({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
