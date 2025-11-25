function roleMiddleware(...roles) {
  return (request, response, next) => {
    // Check User Role =>  [    ]
    const userRole = request.user.role;
    if (!userRole) {
      return response.status(401).json({ message: "un-authorized" });
    }

    const isMatch = roles.includes(userRole);
    if (!isMatch) {
      return response.status(403).json({ message: "Access Denied." });
    }

    next();
  };
}

module.exports = { roleMiddleware };
