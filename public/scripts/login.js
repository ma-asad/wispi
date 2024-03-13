// Path: public/scripts/login.js
import Joi from "joi";

// Create the login and signup forms

export function getLoginForm() {
  return /* html */ `
<div class="login-container">
    <div class="login-form">
            <h1>Wispi</h1>
            <h2><quote>“Wisp of Wisdom, Quotes of \u2019I\u2019llumination”</quote></h2>
            <form class="form-container" action="#" method="post" id="login-form">
                <input class= "form-input" type="text" id="login-username" name="username" placeholder="Enter your username or email" required>
                <input class= "form-input" type="password" id="login-password" name="password" placeholder="Enter your password" required>
                <button  class="form-submit-btn" type="submit">Log In</button>
            </form>
    </div>

    <div class="bottom-form">
        <p class="form-link">Don't have an account? <a href="#/signup">Sign Up</a></p>
    </div>
</div>
`;
}

export function getSignupForm() {
  return /* html */ `
<div class="login-container">
    <div class="signup-form">
        <h1>Wispi</h1>
        <h2><quote>“Wisp of Wisdom, Quotes of \u2019I\u2019llumination”</quote></h2>
        <h4><i>Sign Up to see, share and create Wispis</i></h4>

        <form class="form-container" action="#" method="post">
            <input type="email" id="email" class= "form-input" placeholder="Email" required>
            <span id="email-validation"></span>
            <input type="text" id="fullName" class= "form-input" placeholder="Full Name" required>
            <span id="name-validation"></span>
            <input type="text" id="username" class= "form-input" placeholder="Username" required>
            <span id="username-validation"></span>
            <input type="password" id="password" class= "form-input" placeholder="Password" required>
            <span id="password-validation"></span>
            <input type="password" id="confirmPassword" class= "form-input" placeholder="Confirm Password" required>
            <span id="confirm-password-validation"></span>
            <button type="submit" class="form-submit-btn" href="#/feed">Sign Up</button>
        </form>
    </div>
    <div class="bottom-form">
        <p class="form-link">Have an account? <a href="#/login">Log in</a></p>
    </div>
</div>
`;
}

// Retrieve field values from the form

function getSignUpData() {
  return {
    email: document.getElementById("email").value,
    fullName: document.getElementById("fullName").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value,
  };
}

// function getLoginData() {
//   return {
//     username: document.getElementById("login-username").value,
//     password: document.getElementById("login-password").value,
//   };
// }

const signUpSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "any.required": "email:This field is required",
    "string.email": "email:Invalid email format",
  }),
  fullName: Joi.string().required().messages({
    "any.required": "fullName:This field is required",
  }),
  username: Joi.string().required().alphanum().min(3).max(15).messages({
    "any.required": "username:This field is required",
    "string.alphanum": "username:Only alphanumeric characters are allowed",
    "string.min": "username:Must be at least 3 characters",
    "string.max": "username:Must be at most 15 characters",
  }),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .messages({
      "any.required": "password:This field is required",
      "string.pattern.base": "password:Invalid password format",
    }),
  confirmPassword: Joi.ref("password"),
}).options({ abortEarly: false }); // to return all errors


export function validateSignUpData() {
  const data = getSignUpData();
  const { error } = signUpSchema.validate(data);
  if (error) {
    error.details.forEach((err) => {
      const [field, message] = err.message.split(":");
      displayError(field, message);
    });
  }
}

function displayError(field, message) {
  const errorElement = document.getElementById(`${field}-validation`);
  errorElement.textContent = message;
}
