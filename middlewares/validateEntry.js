const {body} = require("express-validator")

exports.validateRegistration =[
    body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({min:3,max:15}).withMessage("Username should be between 3-15 characters"),

    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({min:6,max:15}).withMessage("Password should be between 3-15 characters")
    
];

exports.validateLogin = [
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({min:6,max:15}).withMessage("Password should be between 3-15 characters")
];

exports.validatePost = [   
    body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({min:3,max:15}).withMessage("Username should be between 3-15 characters"),

    body("title")
    .notEmpty().withMessage("Title is required")
    .isLength({min:3,max:50}).withMessage("Title should be between 3-50 characters"),

    body("desc")
    .notEmpty().withMessage("Description is required")
    .isLength({min:3,max:300}).withMessage("Description should be between 3-300 characters")
];