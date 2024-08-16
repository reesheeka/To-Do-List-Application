const roleMiddleware = (allowedRole) => {
  return function (req, res, next) {
    const user = req.user;

    if (user && user.role === allowedRole) {
      next();
    } else {
      res
        .status(403)
        .send({ success: false, message: 'You are not authorized to access this route'});
    }
  };
};

module.exports = roleMiddleware;
