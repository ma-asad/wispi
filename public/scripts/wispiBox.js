import {
  appendModalToElement,
  selectModalElements,
  showModal,
  hideModal,
  removeModalFromDOM,
  closeModalOnCloseButton,
  closeModalOnOutsideClick,
} from "./popup.js";

// Fetch user's data
async function fetchUserData() {
  const response = await fetch("/api/user/me");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Create the modal HTML
function createWispiPostPopupHTML(user) {
  return /* html */ `
    <div id="overlay" class="overlay"></div>
    <dialog class="wispi-popup-modal" id="wispiPostPopup">
      <form class="wispi-popup-form">
        <div class="wispi-popup-grid-container">
          <div class="wispi-popup-text-area">
            <div class="user-info">
              <img class="profile-pic" src="${user.profilePicture}" alt="User Profile Picture">
              <p class="wispi-username"><strong>${user.username}</strong></p>
            </div>
            <div class="wispi-post-content">
              <textarea id="wispiPostInput" class="wispi-post-input" placeholder="What's on your mind?" maxlength="300" required></textarea>
            </div>
          </div>
          <div class="wispi-popup-submission-area">
              <span class="close-button">\u00D7</span>
              <div class="wispi-popup-source">
              <h4>Author</h4>
              <input type="text" class="wispi-source-input" id="src-author" placeholder="name of author" required>
              <span class="line"></span>
              </div>
              <div class="wispi-popup-source">
              <h4>Source</h4>
              <input type="text" class="wispi-source-input" id="src-wispi" placeholder="source of your Wispi">
              <span class="line"></span>
              </div>
              <div class="wispi-popup-submit">
              <button class="wispi-post-submit-btn">Post</button>
              </div>
          </div>
        </div>
    </form>
    </dialog>`;
}

export async function openWispisPostPopup() {
  try {
    const user = await fetchUserData();

    const wispiPostPopupHTML = createWispiPostPopupHTML(user);

    appendModalToElement(wispiPostPopupHTML, "main");

    const { modal, closeButton, overlay } = selectModalElements(
      "#wispiPostPopup",
      ".close-button",
      "#overlay"
    );

    showModal(modal, overlay);
    closeModalOnCloseButton(modal, overlay, closeButton);
    closeModalOnOutsideClick(modal, overlay);

    const form = document.querySelector(".wispi-popup-form");

    form.addEventListener("submit", function (event) {
      handleWispiSubmit(event, user, modal, overlay);
    });
  } catch (error) {
    console.error("Error opening Wispi post popup:", error);
  }
}

// Handle form submission
async function handleWispiSubmit(event, user, wispiPostPopup, overlay) {
  // Prevent the default form submission
  event.preventDefault();

  // Disable the submit button
  const submitButton = event.target.querySelector(".wispi-post-submit-btn");
  submitButton.disabled = true;

  // Debounce the form submission
  handleWispiSubmitDebounced(
    event,
    user,
    wispiPostPopup,
    overlay,
    submitButton
  );
}

// Debounced function to handle form submission
const handleWispiSubmitDebounced = debounce(
  async (event, user, wispiPostPopup, overlay, submitButton) => {
    // Gather the form data
    const wispiContent = document.querySelector("#wispiPostInput").value;
    const author = document.querySelector("#src-author").value;
    const source = document.querySelector("#src-wispi").value;

    // Prevent submitting a blank post
    if (!wispiContent.trim()) {
      submitButton.disabled = false;
      return;
    }

    // Send the data to the server
    try {
      const response = await fetch("/api/submit-wispi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          userId: user.id,
          wispiContent,
          author,
          source,
        }),
      });

      if (response.status === 401) {
        // Handle session expiration
        console.log("Session expired. Please log in again.");
        // Log the user out and prevent further posting
        // ...
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        console.log(data);

        // Close the popup
        hideModal(wispiPostPopup, overlay);
        removeModalFromDOM(wispiPostPopup, overlay);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
    }
  },
  500
); // Debounce delay of 500ms

function debounce(func, wait) {
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

export function timeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`; // seconds
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m`; // minutes
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h`; // hours
  } else if (diffInSeconds < 604800) {
    return `${Math.floor(diffInSeconds / 86400)}d`; // days
  } else if (diffInSeconds < 2628000) {
    return `${Math.floor(diffInSeconds / 604800)}w`; // weeks
  } else if (diffInSeconds < 31536000) {
    return `${Math.floor(diffInSeconds / 2628000)}mo`; // months
  } else {
    return `${Math.floor(diffInSeconds / 31536000)}y`; // years
  }
}

export function createWispiBox(
  profilePicture,
  username,
  wispiContent,
  author,
  source,
  createdAt,
  wispiId,
  hasLikedWispi,
  hasBookmarkedWispi
) {
  const timeAgoStr = timeAgo(new Date(createdAt));
  const likedClass = hasLikedWispi ? "liked" : "";
  const bookmarkedClass = hasBookmarkedWispi ? "bookmarked" : "";
  return /* html */ `
  <div class="wispi-box">
    <div class="wispi-box-first-row">
      <div class="user-info">
        <img src="${profilePicture}" alt="User Profile Picture" class="profile-pic">
        <p class="wispi-username"><strong><a href="#/profile/${username}">${username}</a></strong></p>
      </div>
      <div class="wispi-time">
        <p>${timeAgoStr}</p>
      </div>
    </div>
    <div class="wispi-content">
      <p class="wispi">“${wispiContent}”</p>
      <div class="wispi-source-container">
        <p class="wispi-source"><b>Source:</b> ${author} ${source}</p>
      </div>
    </div>
    <div class="wispi-actions">
        <div class="wispi-action-icons">
            <button class="like-button ${likedClass}" id="like-button-${wispiId}">
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m7.463 13.423.006.003.008.005.014.006a1.12 1.12 0 0 0 .911.047h.03l.1-.058.005-.003.006-.004a20 
                  20 0 0 0 3.405-2.309l.002-.001c1.654-1.402 3.61-3.597 3.61-6.296a4.33 4.33 0 0 0-.817-2.524A4.44 4.44 0 
                  0 0 12.594.69 4.5 4.5 0 0 0 9.902.606C9.183.806 8.53 1.18 8 1.691A4.46 4.46 0 0 0 6.098.606a4.5 4.5 0 0 
                  0-2.693.085A4.44 4.44 0 0 0 1.257 2.29a4.32 4.32 0 0 0-.816 2.524c0 2.699 1.956 4.894 3.61 6.296v.001a20 
                  20 0 0 0 3.407 2.31z" stroke="#645445" stroke-width=".882"/>
              </svg>

            </button>
            <button class="bookmark-button ${bookmarkedClass}" id="bookmark-button-${wispiId}">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.61 10.636.5 13.191V1.95C.5 1.33.95.816 1.54.747a37.2 37.2 0 0 1 8.586 0c.592.07 1.04.582 
              1.04 1.203v11.24l-5.11-2.555a.5.5 0 0 0-.446 0" stroke="#645445" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </button>
        </div>
    </div>
  </div>`;
}

export async function createWispiBoxesFromData(data) {
  return (
    await Promise.all(
      data.map(async (item) => {
        // Check if the post has been liked by the user
        const likedResponse = await fetch(`/api/hasLiked/${item._id}`);
        const hasLikedWispi = await likedResponse.json();

        // Check if the post has been Bookmarked by the user
        const bookmarkedResponse = await fetch(
          `/api/hasBookmarked/${item._id}`
        );
        const hasBookmarkedWispi = await bookmarkedResponse.json();

        return createWispiBox(
          item.profilePicture,
          item.username,
          item.wispiContent,
          item.author,
          item.source,
          item.createdAt,
          item._id,
          hasLikedWispi.hasLiked,
          hasBookmarkedWispi.hasBookmarked
        );
      })
    )
  ).join("");
}

async function handleLikeButtonClick(likeButton) {
  const wispiId = likeButton.id.split("-")[2];

  try {
    const hasLikedResponse = await fetch(`/api/hasLiked/${wispiId}`);
    const hasLikedWispi = await hasLikedResponse.json();

    const response = await fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wispiId }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.success) {
      console.log(data.message);
      likeButton.classList.toggle("liked");
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error liking/unliking wispi:", error);
  }
}

async function handleBookmarkButtonClick(bookmarkButton) {
  const wispiId = bookmarkButton.id.split("-")[2];

  try {
    const hasBookmarkedResponse = await fetch(`/api/hasBookmarked/${wispiId}`);
    const hasBookmarkedWispi = await hasBookmarkedResponse.json();

    const response = await fetch("/api/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wispiId }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.success) {
      console.log(data.message);
      bookmarkButton.classList.toggle("bookmarked");
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error bookmarking/unbookmarked wispi:", error);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  document.body.addEventListener("click", async function (event) {
    if (event.target.closest(".like-button")) {
      handleLikeButtonClick(event.target.closest(".like-button"));
    }

    if (event.target.closest(".bookmark-button")) {
      handleBookmarkButtonClick(event.target.closest(".bookmark-button"));
    }
  });
});
