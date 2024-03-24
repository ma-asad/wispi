import { createWispiBoxesFromData } from "./wispiBox.js";

export function userSearchResult(
  username,
  fName,
  lName,
  profilePicture,
  followStatus = "Follow"
) {
  return /* html */ `
    <div class="search-result">
      <div class="search-user-container">
        <div class="search-user-info">
          <img class="search-profile-pic" src="${profilePicture}" alt="User Profile Picture">
          <div class="search-user-info-text">
            <p class="search-wispi-username"><strong>${username}</strong></p>
            <p class="search-wispi-name">${fName} ${lName}</p>
          </div>
        </div>
        <button class="search-follow-btn status">${followStatus}</button>
      </div>
    </div>`;
}

export function getSearchPage() {
  return /* html */ `
    <div class="search-page-container">
      <div class="search-bar-container">
        <input class="search-bar" type="text" placeholder="Search" />
      </div>
      <div class="switch-search-container-btn">
        <button class="switch-search-btn" id="switch-search-btn">Accounts</button>
      </div>
      <hr>
      <div class="search-results-container">
        <div class="search-results-user">
        </div>
        <div class="search-results-post" style="display: none;">
        </div>
      </div>
    </div>`;
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export async function handleSearch(event) {
  const searchTerm = event.target.value;

  // Make a fetch request to the server to search for users
  fetch(`/api/search-users?term=${searchTerm}`)
    .then((response) => response.json())
    .then((users) => {
      const userResultsContainer = document.querySelector(
        ".search-results-user"
      );
      userResultsContainer.innerHTML = "";

      // Render the user search results
      users.forEach((user) => {
        const [firstName, lastName] = user.fullName.split(" ");
        const userHTML = userSearchResult(
          user.username,
          firstName,
          lastName,
          user.profilePicture,
          user.followStatus
        );
        userResultsContainer.insertAdjacentHTML("beforeend", userHTML);
      });
    })
    .catch((error) => console.error("Error fetching users:", error));

  // Make a fetch request to the server to search for posts
  const response = await fetch(`/api/search-posts?term=${searchTerm}`);
  const data = await response.json();

  const postResultsContainer = document.querySelector(".search-results-post");
  postResultsContainer.innerHTML = "";

  // Create the WispiBoxes from the data
  const wispiBoxes = await createWispiBoxesFromData(data);

  postResultsContainer.insertAdjacentHTML("beforeend", wispiBoxes);
}
