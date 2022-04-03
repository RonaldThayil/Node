const userData = require("../models/user");
const { response_message } = require("../helper/response");
const { config } = require("dotenv");
const multer = require("multer");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userSign = async (req, res, next) => {
  try {
    userData.find({ email: req.body.email }).then((user) => {
      // res.send(user);
      // if (user.length != 0) {
      //   return response_message({
      //     res,
      //     statusCode: 200,
      //     success: false,
      //     result: [],
      //     message: "Already Exist",
      //   });
      // }
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        const client = new userData({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          socialLogin: req.body.sl,
        });
        client.save().then((resultss) => {
          // res.send("hhhhh");
          return response_message({
            res,
            success: true,
            message: "Register Done",
            result: resultss,
          });
        });
      });
    });
  } catch (error) {
    console.log(error.message, "123");
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    userData
      .find({ email: req.body.email })

      .then((user) => {
        console.log(user, 'user data')
        if (user.length < 1) {
          return response_message({
            res,
            message: "User Doesnt Exist",
            success: false,
          });
        } else {
          bcrypt.compare(
            req.body.password,
            user[0].password,
            (err, results) => {
              if (results) {
                let token = jwt.sign(
                  {
                    userId: user[0]._id,
                    email: user[0].email,
                    name: user[0].name,
                  },
                  "hhhhh",
                  { expiresIn: "24h" }
                );

                let user_data = {
                  email: user[0].email,
                  name: user[0].name,
                  token: token,
                };
                return response_message({
                  res,
                  success: true,
                  message: "User Logged",
                  result: user_data,
                });
              }
              res.send(results);
            }
          );
        }
      });
  } catch (error) {
    console.log(Error, "1111111");
  }
};

exports.changepassword = async (req, res, next) => {
  bcrypt.hash(req.body.newPass, 10, (err, hash) => {
    if (err) {
      return response_message({ res, success: false, message: err.message });
    } else {
      userData.findOne({ email: req.user.email }).then((qq) => {
        console.log(qq, "qqqqqqq");
        let aa = qq.password;
        bcrypt.compare(req.body.oldPass, aa).then((resl) => {
          if (resl) {
            userData
              .findByIdAndUpdate(
                { _id: req.user._id },
                { $set: { password: hash } }
              )
              .then((resi) => {
                return response_message({
                  res,
                  success: true,
                  message: "Password Changed",
                  result: resi,
                });
              });
          } else {
            return response_message({ res, message: "Password Incorrect" });
          }
        });
      });
    }
  });
  // res.send("Done");
  // userData.findOne({ email: req.body.email }).then((result) => {
  //   bcrypt;
  // });
};

exports.fileUpload = async () => {

}

// exports.userLogin = (req, res, next) => {
//   userData.find({ email: req.body.email }).then((user) => {
//     if (userData.length < 1) {
//       return response_message({
//         res,
//         statusCode: statusCode.UNAUTHORIZED,
//         success: 0,
//         message: "User doesn't exist",
//       });
//     }
//     if (userData[0].status != "Active") {
//       return response_message({
//         res,
//         statusCode: statusCode.UNAUTHORIZED,
//         success: 0,
//         message: "Pending Account. Please Verify your Email!!!!!!!",
//       });
//     }
//     bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//       if (!result) {
//         return response_message({
//           res,
//           statusCode: statusCode.UNAUTHORIZED,
//           success: 0,
//           message: "password doesn't match",
//         });
//       }
//       if (result) {
//         const token = jwt.sign(
//           {
//             userId: user[0]._id,
//             name: user[0].name,
//             email: user[0].email,
//             role: user[0].role,
//           },
//           config.tokenKey,
//           {
//             expiresIn: config.tokenExpiryTime,
//           }
//         );
//         user_data = {
//           id: userData[0]._id,
//           name: user[0].name,
//           email: user[0].email,
//           phone_no: user[0].phone_no,
//           role: user[0].role,
//           token: token,
//         };
//         response_message({
//           res,
//           statusCode: statusCode.SUCCESS,
//           success: 1,
//           message: "User logged successfully",
//           result: user_data,
//         });
//       }
//     });
//   });
// };
