export function getHeader() {
  return `
<header class = "navBar">
    <h1>Wispi</h1>
        <nav class = "navLinks">
            <a href="#/signup">Signup</a> |
            <a href="#/login">Login</a> |
            <a href="#/feed">Home</a> |
            <a href="#/wispis">Wispis</a> |
            <a href="#/notifications">Notifications</a> |
            <a href="#/search">Search</a> |
            <a href="#/profile">Profile</a> |
            <a href="#/settings">Settings</a> |
            <a href="#/test-web-service">Test Web Service</a>
        </nav>
</header>
`;
}

export function getFooter() {
  return `
<footer class="footer">
    <p>Privacy | Terms | Wispi &copy; 2024</p>
</footer>`;
}
