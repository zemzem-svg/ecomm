// const { check, validationResult } = require("express-validator");

// exports.registerRules = () =>
//     [
//         check("name", "name is required").notEmpty(),
//         check("lastname", "lastname is required").notEmpty(),
//         check("email", "email is required").notEmpty(),
//         check("email", "check email again").isEmail(),
//         check("password", "password is required").isLength({
//             min: 6,
//             max: 20,
//         }),
    
//     ];

// exports.loginRules =() =>
//     [
      
//         check("email", "email is required").notEmpty(),
//         check("email", "check email again").isEmail(),
//         check("password", "password is required").isLength({
//             min: 6,
//             max: 20,
//         }),
    
//     ];

// exports.validation = (req, res, next) => {
//     const errors = validationResult(req);
//     console.log(errors);
//     if (!errors.isEmpty()) {
//         return res.status(400).send({
//             errors: errors.array().map((el) => ({
//                 msg: el.msg
//             })),
//         });
//             next();
//         }};


const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("name", "name is required").notEmpty(),
  check("email", "email is required").notEmpty(),
  check("email", "invalid email").isEmail(),
  check("password", "invalid password").isLength({
    min: 6,
    max: 20,
  }),
];


exports.loginRules = () => [
  check("email", "email is required").notEmpty(),
  check("email", "invalid email").isEmail(),
  check("password", "invalide password").isLength({
    min: 6,
    max: 20,
  }),
];
exports.commentRules = () => [
  check("text", "Text is Required").not().isEmpty()
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      res
        .status(400)
        .send({ errors: errors.array().map((el) => ({ msg: el.msg })) });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};