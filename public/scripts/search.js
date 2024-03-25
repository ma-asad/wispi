import { createWispiBoxesFromData } from "./wispiBox.js";

export async function userSearchResult(
  username,
  profilePicture,
  fullName,
  userId
) {
  const response = await fetch(`/api/follow-status/${userId}`);
  const { followStatus } = await response.json();

  return /* html */ `
    <div class="search-result">
      <div class="search-user-container">
        <div class="search-user-info">
          <img class="search-profile-pic" src="${profilePicture}" alt="User Profile Picture">
          <div class="search-user-info-text">
            <p class="search-wispi-username"><strong>${username}</strong></p>
            <p class="search-wispi-name">${fullName}</p>
          </div>
        </div>
        <button class="search-follow-btn status" data-user-id="${userId}">${followStatus}</button>
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
    .then(async (users) => {
      const userResultsContainer = document.querySelector(
        ".search-results-user"
      );
      userResultsContainer.innerHTML = "";

      // Render the user search results
      for (const user of users) {
        const userHTML = await userSearchResult(
          user.username,
          user.profilePicture,
          user.fullName,
          user._id
        );
        userResultsContainer.insertAdjacentHTML("beforeend", userHTML);
      }
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

export async function handleFollowButtonClick(button) {
  let $this = $(button);
  let userId = $this.data("user-id");

  try {
    // Send a POST request to the /api/follow endpoint
    const response = await fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }), // Send the userId in the request body
    });

    if (response.ok) {
      const { message } = await response.json();
      $this.text(message); // Update the button text with the server response message

      // Fetch the updated follow status from the server
      const followStatusResponse = await fetch(`/api/follow-status/${userId}`);
      const { followStatus } = await followStatusResponse.json();

      // Update the button text with the updated follow status
      $this.text(followStatus);
    } else {
      console.error("Error following/unfollowing user:", await response.text());
    }
  } catch (error) {
    console.error("Error fetching follow status:", error);
  }
}

$(document).on("click", ".search-follow-btn", function () {
  handleFollowButtonClick(this);
});

$(document).on("click", "#switch-search-btn", function () {
  let $this = $(this);
  let text = $this.text();
  $this.text(text == "Accounts" ? "Posts" : "Accounts");

  $(".search-results-user").toggle();
  $(".search-results-post").toggle();
});
