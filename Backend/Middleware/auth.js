const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  const token = req.cookies?.token || req.body?.token || req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  console.log(token , process.env.JWT_SECRET_KEY)

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = payload;
  } 
  catch (error) {
    console.log("User is not authorized");
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "User is not authorized",
    });
  }

  next();
};

exports.isStudent = async (req, res, next) => {
    if (req.user.accountType !== "Student") {
        res.status(401).json({
        success: true,
        message: "This is protected route for inly Student.",
        });
    }
    next();
};

exports.isAdmin = async (req, res, next) => {
    if (req.user.accountType !== "Admin") {
        res.status(401).json({
        success: true,
        message: "This is protected route for inly Admin.",
        });
    }
    next();
};

exports.isInstructor = async (req, res, next) => {
    if (req.user.accountType !== "Instructor") {
        res.status(401).json({
        success: true,
        message: "This is protected route for inly Instructor.",
        });
    }
    next();
};
