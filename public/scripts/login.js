export function getLoginForm() {
  return `
        <h2>Wispi</h2>
        <h4><i>"Wisp of Wisdom, Quotes of Illumination"</i></h4>
        <form id="loginForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <input type="submit" value="Login">
        </form>
        <p>Don't have an account? <a href="#/signup">Sign up</a></p>
    `;
}

export function getSignupForm() {
  return `
        <h2>Wispi</h2>
        <h4><i>"Wisp of Wisdom, Quotes of Illumination"</i></h4>
        <h4><i>Sign Up to see, share and create Wispis</i></h4>
        <form id="signupForm">
            <input type="email" id="email" placeholder="Email" required>
            <input type="text" id="fullName" placeholder="Full Name" required>
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
            <input type="submit" value="Signup">
        </form>
        <p>Have an account? <a href="#/login">Log in</a></p>
    `;
}
