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
                <p id="forgot-pw-link" class="form-link"><a href="#">Forgotten your Password?</a></p>
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
            <input type="text" id="fullName" class= "form-input" placeholder="Full Name" required>
            <input type="text" id="username" class= "form-input" placeholder="Username" required>
            <input type="password" id="password" class= "form-input" placeholder="Password" required>
            <input type="password" id="confirmPassword" class= "form-input" placeholder="Confirm Password" required>
            <button type="submit" class="form-submit-btn" href="#/feed">Sign Up</button>
        </form>
    </div>
    <div class="bottom-form">
        <p class="form-link">Have an account? <a href="#/login">Log in</a></p>
    </div>
</div>
`;
}
