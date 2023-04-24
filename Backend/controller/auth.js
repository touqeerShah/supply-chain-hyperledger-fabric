const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * This function is used to register user when we create user it will generate user Private key and Public Key and store them into KeyStore
 * @param {*} req
 * @param {*} res
 */
module.exports.login = async (req, res) => {
  try {
    if (
      (await bcrypt.compare(
        req.body.password,
        await bcrypt.hash("admin@123", 12)
      )) &&
      req.body.password == "admin"
    ) {
      const tokenPayload = {
        email: user.email,
      };
      const accessToken = jwt.sign(tokenPayload, "SECRET");
      res.status(201).json({
        status: "success",
        message: "User Logged In!",
        data: {
          accessToken,
        },
      });
    } else {
      const err = new Error("Wrong Password!");
      err.status = 400;
      throw err;
    }
  } catch (err) {
    res.status(err.status).json({
      status: "fail",
      message: err.message,
    });
  }
};

/**
 * This function is used to register user when we create user it will generate user Private key and Public Key and store them into KeyStore
 * @param {*} req
 * @param {*} res
 */
module.exports.verify = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized!",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, "SECRET");
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized!",
    });
  }
};
