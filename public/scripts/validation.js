// Path: public/scripts/validation.js

// Function to validate email
export function validateEmail(emailInput, emailValidationSpan) {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // i.g "a@b.c"

  if (!emailRegex.test(email)) {
    emailValidationSpan.textContent = "Please enter a valid email address.";
    emailValidationSpan.classList.add("error");
  } else {
    emailValidationSpan.textContent = "";
    emailValidationSpan.classList.remove("error");
  }
}

// Function to validate full name
export function validateFullName(fullNameInput, fullNameValidationSpan) {
  const fullName = fullNameInput.value.trim();
  const fullNameRegex = /^[a-zA-Z\s'-]+$/; // Allows letters, spaces, apostrophes, and hyphens

  if (!fullNameRegex.test(fullName)) {
    fullNameValidationSpan.textContent =
      "Full name can only contain letters, spaces, apostrophes, and hyphens.";
    fullNameValidationSpan.classList.add("error");
  } else if (fullName.length < 2) {
    fullNameValidationSpan.textContent =
      "Full name must be at least 2 characters long.";
    fullNameValidationSpan.classList.add("error");
  } else {
    fullNameValidationSpan.textContent = "";
    fullNameValidationSpan.classList.remove("error");
  }
}

// Function to validate username
export function validateUsername(usernameInput, usernameValidationSpan) {
  const username = usernameInput.value.trim();
  const usernameRegex = /^[a-zA-Z0-9_]+$/; // Allows alphanumeric characters and underscores

  if (!usernameRegex.test(username)) {
    usernameValidationSpan.textContent =
      "must only contain alphanumeric characters and underscores.";
    usernameValidationSpan.classList.add("error");
  } else if (username.length < 3) {
    usernameValidationSpan.textContent =
      "Username must be at least 3 characters long.";
    usernameValidationSpan.classList.add("error");
  } else if (username.length > 15) {
    usernameValidationSpan.textContent =
      "Username must be at most 15 characters long.";
    usernameValidationSpan.classList.add("error");
  } else {
    usernameValidationSpan.textContent = "";
    usernameValidationSpan.classList.remove("error");
  }
}

// Function to validate password
export function validatePassword(passwordInput, passwordValidationSpan) {
  const password = passwordInput.value.trim();

  if (password.length < 8) {
    passwordValidationSpan.textContent =
      "Password must be at least 8 characters long.";
    passwordValidationSpan.classList.add("error");
  } else {
    passwordValidationSpan.textContent = "";
    passwordValidationSpan.classList.remove("error");
  }
}

// Function to validate confirm password
export function validateConfirmPassword(
  passwordInput,
  confirmPasswordInput,
  confirmPasswordValidationSpan
) {
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (password !== confirmPassword) {
    confirmPasswordValidationSpan.textContent = "Passwords do not match.";
    confirmPasswordValidationSpan.classList.add("error");
  } else {
    confirmPasswordValidationSpan.textContent = "";
    confirmPasswordValidationSpan.classList.remove("error");
  }
}
