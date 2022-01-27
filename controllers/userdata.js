const userData = require("../models/user");

const { response_message } = require("../helper/response");
const { config } = require("dotenv");
const mongoose = require("mongoose");

exports.userSign = async (req, res, next) => {
  try {
    // console.log(req.body.name, "33333");
    // userData.init();
    let client = new userData({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      socialLogin: req.body.sl,
    });

    await client.save();
    res.send(client);

    // const confirm_token
    // userData.find({ email: req.body.email }).then((result) => {
    //   if (result.length != 0) {
    //   }
    // });
  } catch (error) {
    console.log(error.message, "123");
  }
};

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
