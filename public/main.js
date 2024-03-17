// Path: public/main.js

// Import functions and constants
import { getLoginForm, getSignupForm } from "./scripts/login.js";
import {
  validateEmail,
  validateFullName,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from "./scripts/validation.js";
import { getHeader, getFooter } from "./scripts/header_footer.js";
import { getExploreMode, setExploreMode, getFeed } from "./scripts/feed.js";
import { openWispisPostPopup } from "./scripts/wispi_popup.js";
import { openNotificationsPopup } from "./scripts/notif_popup.js";
import { getSearchPage } from "./scripts/search.js";
import { getProfilePage } from "./scripts/profile.js";
import { openSettingsPopup } from "./scripts/settings.js";

document.addEventListener("DOMContentLoaded", () => {
  navigateTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});

function navigateTo(hash) {
  switch (hash) {
    case "#/signup":
      loadSignupPage();
      break;
    case "#/login":
      loadLoginPage();
      break;
    case "#/feed":
      loadFeedPage();
      break;
    case "#/search":
      loadSearchPage();
      break;
    case "#/profile":
      loadProfilePage();
      break;
    default:
      loadLoginPage();
      break;
  }
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

  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      window.location.hash = "#/feed";
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
    .querySelector(".form-container")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      validateSignUpData();
    });
}

// Function to load the feed, search and profile pages

//Feed
function loadFeedPage() {
  const feedContent = getFeed();
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

  $(document).on("click", ".search-follow-btn", function () {
    var $this = $(this);
    var text = $this.text();
    $this.text(text == "Follow" ? "Following" : "Follow");
  });

  $(document).on("click", "#switch-search-btn", function () {
    var $this = $(this);
    var text = $this.text();
    $this.text(text == "Accounts" ? "Posts" : "Accounts");

    $(".search-results-user").toggle();
    $(".search-results-post").toggle();
  });
}

//Profile
function loadProfilePage() {
  const profileContent = getProfilePage();
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
  });
}
