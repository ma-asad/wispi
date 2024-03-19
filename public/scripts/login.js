// Path: public/scripts/login.js
import { validateLoginForm } from "./validation.js";

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
                <span id="login-validation"></span>
                <button class="form-submit-btn" type="submit">Log In</button>
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

        <form class="form-container" action="#" method="post" id="signup-form">
          <div class= "form-input">
            <input type="email" id="email" placeholder="Email" required>
            <span id="email-validation"></span>
          </div>
          <div class= "form-input">
            <input type="text" id="fullName" placeholder="Full Name" required>
            <span id="name-validation"></span>
          </div>
          <div class= "form-input">
            <input type="text" id="username" placeholder="Username" required>
            <span id="username-validation"></span>
          </div>
          <div class= "form-input">
            <input type="password" id="password" placeholder="Password" required>
            <span id="password-validation"></span>
          </div>
          <div class= "form-input">
            <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
            <span id="confirm-password-validation"></span>
          </div>
            <button type="submit" class="form-submit-btn">Sign Up</button>
        </form>
    </div>
    <div class="bottom-form">
        <p class="form-link">Have an account? <a href="#/login">Log in</a></p>
    </div>
</div>
`;
}


// Function to handle login
export function handleLogin(event, usernameInput, passwordInput, loginValidationSpan) {
  event.preventDefault();

  // const usernameInput = document.getElementById("login-username");
  // const passwordInput = document.getElementById("login-password");
  // const loginValidationSpan = document.getElementById("login-validation");

  const isValid = validateLoginForm(
    usernameInput,
    passwordInput,
    loginValidationSpan
  );

  if (isValid) {
    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.hash = "#/feed";
        } else {
          loginValidationSpan.textContent = data.message;
          loginValidationSpan.classList.add("error");
        }
      });
  }
}

