import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const result = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = result;
    next();
  } catch (err) {
    return res.status(400).json({
      Error: err.message,
    });
  }
};

export default auth;

