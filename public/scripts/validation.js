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
    return true;
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
    return true;
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
    return false;
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
    return true;
  }
}

// Function to validate password
export function validatePassword(passwordInput, passwordValidationSpan) {
  const password = passwordInput.value.trim();

  if (password.length < 8) {
    passwordValidationSpan.textContent =
      "Password must be at least 8 characters long.";
    passwordValidationSpan.classList.add("error");
    return false;
  } else {
    passwordValidationSpan.textContent = "";
    passwordValidationSpan.classList.remove("error");
    return true;
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
    return false;
  } else {
    confirmPasswordValidationSpan.textContent = "";
    confirmPasswordValidationSpan.classList.remove("error");
    return true;
  }
}

// Function to validate the signup form
export function validateSignUpData(
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
) {
  const isEmailValid = validateEmail(emailInput, emailValidationSpan);
  const isFullNameValid = validateFullName(
    fullNameInput,
    fullNameValidationSpan
  );
  const isUsernameValid = validateUsername(
    usernameInput,
    usernameValidationSpan
  );
  const isPasswordValid = validatePassword(
    passwordInput,
    passwordValidationSpan
  );
  const isConfirmPasswordValid = validateConfirmPassword(
    passwordInput,
    confirmPasswordInput,
    confirmPasswordValidationSpan
  );

  console.log("test");
  if (
    !isEmailValid ||
    !isFullNameValid ||
    !isUsernameValid ||
    !isPasswordValid ||
    !isConfirmPasswordValid
  ) {
    // Display validation errors
    console.log("Validation errors");
    return;
  }

  const email = emailInput.value;
  const fullName = fullNameInput.value;
  const username = usernameInput.value;
  const password = passwordInput.value;

  fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, fullName, username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.hash = "#/feed";
      } else {
        // Handle signup errors
        const errors = data.message.split(", ");
        errors.forEach((error) => {
          if (error === "Email already exists") {
            emailValidationSpan.textContent = error;
            emailValidationSpan.classList.add("error");
          }
          if (error === "Username already exists") {
            usernameValidationSpan.textContent = error;
            usernameValidationSpan.classList.add("error");
          }
        });
      }
    });
}
