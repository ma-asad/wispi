// Path: public/main.js

// Import functions and constants
import { getLoginForm, getSignupForm, handleLogin } from "./scripts/login.js";
import {
  validateEmail,
  validateFullName,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  validateSignUpData,
} from "./scripts/validation.js";
import { getHeader, getFooter } from "./scripts/header_footer.js";
import { getExploreMode, setExploreMode, getFeed } from "./scripts/feed.js";
import { openWispisPostPopup } from "./scripts/wispiBox.js";
import { openNotificationsPopup } from "./scripts/notif_popup.js";
import { getSearchPage, handleSearch, debounce } from "./scripts/search.js";
import {
  getProfilePage,
  openEditProfileModal,
} from "./scripts/profile.js";
import { openSettingsPopup } from "./scripts/settings.js";

// Load the page content
document.addEventListener("DOMContentLoaded", () => {
  navigateTo(window.location.hash);
});

// Add event listener for hash changes in navigation
window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});

async function navigateTo(hash) {
  // Extract the username from the hash when it's a profile page
  let username;
  if (hash.startsWith("#/profile/")) {
    username = hash.split("/")[2];
  }

  // If no username is provided in the URL, fetch the current user's username
  if (hash === "#/profile" && !username) {
    const response = await fetch("/api/user/me");
    const user = await response.json();
    username = user.username;
  }

  // Make an AJAX request to check if the user is logged in
  $.ajax({
    url: "/api/isLoggedIn",
    method: "GET",
    success: function (isLoggedIn) {
      if (isLoggedIn) {
        // If the user is logged in, redirect to the home page if they try to access the login or signup page
        if (hash === "#/login" || hash === "#/signup") {
          window.location.hash = "#/feed";
        } else {
          // If the user is logged in, load the page normally
          // If the user is logged in, load the page normally
          switch (true) {
            case hash === "#/feed":
              loadFeedPage();
              break;
            case hash === "#/search":
              loadSearchPage();
              break;
            case hash === "#/profile" || hash.startsWith("#/profile/"):
              loadProfilePage(username);
              break;
            default:
              loadLoginPage();
              break;
          }
        }
      } else {
        // If the user is not logged in, load the login/signup page or redirect to the login page
        switch (hash) {
          case "#/signup":
            loadSignupPage();
            break;
          case "#/login":
            loadLoginPage();
            break;
          default:
            window.location.hash = "#/login";
            break;
        }
      }
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

// Function to render the header and footer
function renderHeader() {
  return getHeader();
}

function renderFooter(page = null) {
  return getFooter(page);
}

// Function to load the page content
function loadPageContent(content, includeHeader = true, page = null) {
  const app = $("#app");
  app.html(content);

  const headerElement = $("header");
  const footerElement = $("footer");

  if (includeHeader) {
    headerElement.show();
    headerElement.html(renderHeader());
    footerElement.html(renderFooter(page));
  } else {
    headerElement.hide();
    footerElement.html(renderFooter("login"));
  }

  // event listener for the "nav-wispi-post" element
  $("#nav-wispi-post").click((event) => {
    event.preventDefault();
    openWispisPostPopup();
  });

  app.on("click", "#wispi-post-input", (event) => {
    event.preventDefault();
    openWispisPostPopup();
  });

  // event listener for the "nav-notif" element
  $("#nav-notif").click((event) => {
    event.preventDefault();
    openNotificationsPopup();
  });

  // event listener for the "nav-settings" element
  $("#nav-settings").click((event) => {
    event.preventDefault();
    openSettingsPopup();
  });
}

// Function to load the login page and sign up page
function loadLoginPage() {
  const newDiv = document.createElement("div");
  document.body.appendChild(newDiv);
  const loginContent = getLoginForm();
  loadPageContent(loginContent, false);

  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");
  const loginValidationSpan = document.getElementById("login-validation");

  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      handleLogin(event, usernameInput, passwordInput, loginValidationSpan);
    });
}

function loadSignupPage() {
  const signupContent = getSignupForm();
  loadPageContent(signupContent, false);

  const emailInput = document.getElementById("email");
  const emailValidationSpan = document.getElementById("email-validation");
  const fullNameInput = document.getElementById("fullName");
  const fullNameValidationSpan = document.getElementById("name-validation");
  const usernameInput = document.getElementById("username");
  const usernameValidationSpan = document.getElementById("username-validation");
  const passwordInput = document.getElementById("password");
  const passwordValidationSpan = document.getElementById("password-validation");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const confirmPasswordValidationSpan = document.getElementById(
    "confirm-password-validation"
  );

  emailInput.addEventListener("input", () =>
    validateEmail(emailInput, emailValidationSpan)
  );
  fullNameInput.addEventListener("input", () =>
    validateFullName(fullNameInput, fullNameValidationSpan)
  );
  usernameInput.addEventListener("input", () =>
    validateUsername(usernameInput, usernameValidationSpan)
  );
  passwordInput.addEventListener("input", () =>
    validatePassword(passwordInput, passwordValidationSpan)
  );
  confirmPasswordInput.addEventListener("input", () =>
    validateConfirmPassword(
      passwordInput,
      confirmPasswordInput,
      confirmPasswordValidationSpan
    )
  );

  document
    .getElementById("signup-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      validateSignUpData(
        emailInput,
        emailValidationSpan,
        fullNameInput,
        fullNameValidationSpan,
        usernameInput,
        usernameValidationSpan,
        passwordInput,
        passwordValidationSpan,
        confirmPasswordInput,
        confirmPasswordValidationSpan
      );
    });
}
// Function to load the feed, search and profile pages

//Feed
async function loadFeedPage() {
  const feedContent = await getFeed();
  loadPageContent(feedContent);

  // Use jQuery to add the event listener
  $("#switchPageBtn").click(function () {
    setExploreMode(!getExploreMode());
    loadFeedPage();
  });
}

//Search
function loadSearchPage() {
  const searchContent = getSearchPage();
  loadPageContent(searchContent);

  // Attach event listener for search input
  const searchInput = document.querySelector(".search-bar");
  if (searchInput) {
    searchInput.addEventListener("input", debounce(handleSearch, 500));
  } else {
    console.error("No element with class 'search-bar' found");
  }
}

//Profile
async function loadProfilePage(username) {
  try {
    // Load the appropriate profile page
    const profileContent = await getProfilePage(username);
    loadPageContent(profileContent, true);

    $(document).ready(function () {
      // Hide the reposts div initially
      $(".profile-activities-reposts").hide();

      $("#profile-wispis-btn").click(function () {
        $(".profile-activities-wispis").show();
        $(".profile-activities-reposts").hide();
        $(this).addClass("active");
        $("#profile-reposts-btn").removeClass("active");
      });

      $("#profile-reposts-btn").click(function () {
        $(".profile-activities-reposts").show();
        $(".profile-activities-wispis").hide();
        $(this).addClass("active");
        $("#profile-wispis-btn").removeClass("active");
      });

      // Add event listener for the "Edit Profile" button
      // Fetch the username of the logged-in user
      fetch("/api/user/me")
        .then(response => response.json())
        .then(user => {
          // Only add the event listener if we're on the current user's profile page
          if (!username || username === user.username) {
            $(".edit-profile-btn").click(openEditProfileModal);
          }
        })
        .catch(error => console.error("Error fetching user:", error));
    });
  } catch (error) {
    console.error("Error loading profile page:", error);
  }
}