const FormValidator = require("./FormValidator");

const formValidationRules = [
  {
    field: "name",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "First Name is required.",
  },
  {
    field: "email",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "Email is required.",
  },
  {
    field: "email",
    method: "isEmail",
    validWhen: true,
    message: "That is not a valid email.",
  },
  {
    field: "password",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "Password is required.",
  },
  {
    field: "password",
    method: "matches",
    validWhen: true,
    args: [/^[a-zA-Z0-9]+$/],
    message: "Allowed characters for password is a-z, A-Z, 0-9.",
  },
  {
    field: "password",
    method: "isLength",
    validWhen: true,
    args: [{ min: 8, max: 30 }],
    message: "Password must be between 8 and 30 characters",
  },
  {
    field: "newPassword",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "New Password is required.",
  },
  {
    field: "newPassword",
    method: "matches",
    validWhen: true,
    args: [/^[a-zA-Z0-9]+$/],
    message: "Allowed characters for password is a-z, A-Z, 0-9.",
  },
  {
    field: "newPassword",
    method: "isLength",
    validWhen: true,
    args: [{ min: 8, max: 30 }],
    message: "Password must be between 7 and 30 characters",
  },
  {
    field: "role",
    method: "matches",
    validWhen: true,
    args: [/^[A-Z]+$/],
    message: "Allowed characters for role A-Z",
  },
  {
    field: "enabled",
    method: "isBoolean",
    validWhen: true,
    message: "isAdmin field must be true or false",
  },
];

module.exports = formValidationRules;
