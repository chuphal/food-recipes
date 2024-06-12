import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
  // converting in to cookie
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // mili sec.
    httpOnly: true, // prevent xss attacks ie. cookie is not accessible using javascript.
    sameSite: "strict", // CSRF attacks.
    secure: process.env.NODE_ENV !== "development", // true when we are in production..
  });
};

export default generateTokenAndSetCookie;
