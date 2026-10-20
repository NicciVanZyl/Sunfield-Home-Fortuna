const jwt = require("jsonwebtoken");

// Checks the "Authorization: Bearer <token>" header and attaches the user to req.user
const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authorised: no token" });
  }
  try {
    const token = header.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, role, iat, exp }
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Not authorised: invalid or expired token" });
  }
};

// Use after protect: restrictTo('admin')
const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res
        .status(403)
        .json({ error: "Forbidden: insufficient permissions" });
    }
    next();
  };

module.exports = { protect, restrictTo };
