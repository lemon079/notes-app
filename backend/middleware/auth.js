import { verifyToken } from "../utils/auth.js";

function checkForAuthentication(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(404).json("Login First");
  const isTokenVerified = verifyToken(token);
  if (!isTokenVerified) return res.status(401).json("Invalid Token");
  req.user = isTokenVerified;
  next();
}

export { checkForAuthentication };
