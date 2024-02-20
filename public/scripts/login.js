export function getLoginForm() {
  return /* html */ `
<div class="login-container">
    <div class="login-form">
            <h1>Wispi</h1>
            <h2><quote>“Wisp of Wisdom, Quotes of \u2019I\u2019llumination”</quote></h2>
            <form action="#" method="post">
                <input type="text" id="username" name="username" placeholder="Enter your username or email" required>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
                <button type="submit">Log In</button>
                <p><a href="#">Forgotten your Password?</a></p>
            </form>
    </div>

    <div class="login-form">
        <p>Don't have an account? <a href="#/signup">Sign Up</a></p>
    </div>
</div>
`;
}

export function getSignupForm() {
  return /* html */ `
<div class="login-container">
    <div class="login-form">
        <h1>Wispi</h1>
        <h2><quote>“Wisp of Wisdom, Quotes of \u2019I\u2019llumination”</quote></h2>
        <h4><i>Sign Up to see, share and create Wispis</i></h4>

        <form action="#" method="post">
            <input type="email" id="email" placeholder="Email" required>
            <input type="text" id="fullName" placeholder="Full Name" required>
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
            <button type="submit">Sign Up</button>
        </form>
    </div>
    <div class="login-form">
        <p>Have an account? <a href="#/login">Log in</a></p>
    </div>
</div>
`;
}
