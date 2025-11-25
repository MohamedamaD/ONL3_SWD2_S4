const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Validate Token

function authMiddleware(request, response, next) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    response.status(401).json({ message: "un-authorized" });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    response.status(401).json({ message: "un-authorized" });
  }

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    request.user = userData;
    next();
  } catch (error) {
    response.status(401).json({ message: "Invalid Token Or Expired" });
  }
}

module.exports = { authMiddleware };

// axios.get("/me", {
//   headers: {
//     authorization: `Bearer ${localStorage.getItem("token")}`
//   },
// });

// axios.post("/users", {   }, {
//   headers: {
//     authorization: `Bearer ${localStorage.getItem("token")}`
//   },
// });

// axios.delete(`/users/${id}`, {
//   headers: {
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });
