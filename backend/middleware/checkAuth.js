const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(
      token,
      "i-am-not-gonna-tell-what-the-password-is"
    );
    req.userData = { email: decodeToken.email, userId: decodeToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed" });
  }
};
