const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * This function is used to register user when we create user it will generate user Private key and Public Key and store them into KeyStore
 * @param {*} req
 * @param {*} res
 */
module.exports.login = async (req, res) => {
  console.log(
    " req.body",
    req.body,
    Buffer.from("admin@123").toString("base64", req.body)
  );
  try {
    if (req.body.userid != "admin") {
      console.log("2");

      res.send({
        status: 400,
        message: "Wrong User Id!",
      });
    } else if (
      Buffer.from("admin@123").toString("base64") != req.body.password
    ) {
      console.log("1");
      res.send({
        status: 400,
        message: "Wrong Password!",
      });
    } else if (
      Buffer.from("admin@123").toString("base64") === req.body.password &&
      req.body.userid == "admin"
    ) {
      console.log("3");

      const tokenPayload = {
        userid: req.body.userid,
      };
      const accessToken = jwt.sign(tokenPayload, "SECRET");
      console.log("accessToken", accessToken);
      res.send({
        status: 200,
        message: "User Logged In!",
        data: {
          accessToken,
        },
      });
    } else {
      console.log("I am Here");
      // const err = new Error("Wrong Password!");
      // err.status = 400;
      // throw err;
    }
  } catch (err) {
    console.log("4");

    res.send({
      status: err.status,
      message: err.message,
    });
  }
};

/**
 * This function is used to register user when we create user it will generate user Private key and Public Key and store them into KeyStore
 * @param {*} req
 * @param {*} res
 */
module.exports.verifyToken = async (req, res) => {
  console.log("req.headers", req.headers);
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.send({
      status: "401",
      message: "Unauthorized!",
    });
  }
  console.log("authHeader", authHeader);
  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, "SECRET");
    req.userid = user;
    res.send({
      status: "200",
      message: "authorized!",
    });
    // next();
  } catch (error) {
    res.send({
      status: "401",
      message: "Unauthorized!",
    });
  }
};
/**
 * This function is used to register user when we create user it will generate user Private key and Public Key and store them into KeyStore
 * @param {*} req
 * @param {*} res
 */
module.exports.verify = async (req, res, next) => {
  console.log("req.headers", req.headers);
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.send({
      status: "401",
      message: "Unauthorized!",
    });
  }
  console.log("authHeader", authHeader);
  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, "SECRET");
    req.userid = user;
    // res.send({
    //   status: "200",
    //   message: "authorized!",
    // });
    next();
  } catch (error) {
    res.send({
      status: "401",
      message: "Unauthorized!",
    });
  }
};
