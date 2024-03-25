import {
  appendModalToElement,
  selectModalElements,
  showModal,
  hideModal,
  removeModalFromDOM,
} from "./popup.js";
import { createWispiBoxesFromData } from "./wispiBox.js";
import { handleFollowButtonClick } from "./search.js";

export async function getProfilePage(username) {
  // Fetch the user's data from the server
  let response;
  if (username) {
    response = await fetch(`/api/user/${username}`);
  } else {
    response = await fetch("/api/user/me");
  }
  // Check if the server returned a 404 error
  if (response.status === 404) {
    // Return an HTML string that displays an error message
    return /* html */ `
      <div class="error-page-container">
        <h1>ERROR 404</h1>
        <p>User not found</p>
      </div>
    `;
  }

  const user = await response.json();

  // Fetch the username of the current user
  const responseMe = await fetch("/api/user/me");
  const userMe = await responseMe.json();

  // Count the number of followers and following
  const followersCount = user.followers.length;
  const followingCount = user.following.length;

  // Fetch the follow status
  const followStatusResponse = await fetch(`/api/follow-status/${user._id}`);
  const { followStatus } = await followStatusResponse.json();

  // Fetch the user's posts
  const responsePosts = await fetch(`/api/user/${username}/wispis`);
  const wispiData = await responsePosts.json();

  // Create the WispiBoxes from the posts data
  const userWispis = await createWispiBoxesFromData(wispiData);

  // Create the profile page HTML with the user's data
  const profilePageHTML = /* html */ `
  <div class="profile-page-container">
      <div class="profile-details-container">
          <div class="profile-details-first-column">
              <div class="profile-name-username-container">
                  <p class="profile-name">${user.fullName}</p>
                  <p class="profile-username">@${user.username}</p>
              </div>
              <div class="profile-bio-container">
                  <p class="profile-bio">${user.bio}</p>
              </div>
            <div class="profile-actions">
                <button class="follow-btn">${followersCount} Followers</button>
                <button class="follow-btn">${followingCount} Following</button>
                ${
                  username === userMe.username
                    ? '<button class="edit-profile-btn">Edit Profile</button>'
                    : `<button class="follow-user-btn" data-user-id="${user._id}">${followStatus}</button>`
                }
            </div>
          </div>
          <div class="profile-details-second-column">
              <div class="profile-image">
                  <img src="${
                    user.profilePicture
                  }" alt="Profile Picture" class="profile-picture"/>
              </div>
          </div>
      </div>
      <div class="profile-activities-container">
          <div class="profile-activities-header">
            <button id="profile-wispis-btn" class="profile-activities-header-btn active">Wispis</button>
            <button id="profile-bookmarks-btn" class="profile-activities-header-btn">Bookmarks</button>
          </div>
      <div class="profile-activities-content">
          <div class="profile-activities-wispis">
          ${userWispis}
          </div>
      </div>
          <div class="profile-activities-bookmarks">
          </div>
      </div>
    </div>
  </div>`;

  // Return the HTML string
  return profilePageHTML;
}

export async function openEditProfileModal() {
  // Fetch the user's data from the server
  const response = await fetch("/api/user/me");
  const user = await response.json();

  // Create a dialog with a form
  const editProfileHTML = /* html */ `
  <dialog id="editProfileDialog" class="edit-profile-dialog">
    <form class="edit-profile-form">
      <label for="profile-picture">Profile Picture:</label>
      <input type="file" id="profile-picture" name="profile-picture" accept="image/*">
      
      <label for="bio">Bio:</label>
      <textarea id="bio" name="bio" maxlength="50">${user.bio}</textarea>
      
      <button type="button" class="save-btn">Save</button>
      <button type="button" class="cancel-btn">Cancel</button>
    </form>
  </dialog>
  <div id="overlay" class="overlay"></div>
`;

  // Append the modal and the overlay to the <main> element
  appendModalToElement(editProfileHTML, "main");

  // Select the modal, the close button, and the overlay
  const {
    modal: editProfileDialog,
    closeButton,
    overlay,
  } = selectModalElements("#editProfileDialog", ".cancel-btn", "#overlay");

  showModal(editProfileDialog, overlay);

  const editProfileForm = $(".edit-profile-form");

  // Add event listener to the "Save" button
  $(".save-btn").click(async () => {
    await saveChanges(editProfileForm, editProfileDialog, overlay);
  });

  // Close the modal when 'Cancel' is clicked
  closeButton.click(function () {
    hideModal(editProfileDialog, overlay);
    removeModalFromDOM(editProfileDialog, overlay);
  });
}

async function saveChanges(editProfileForm, editProfileDialog, overlay) {
  const formData = new FormData(editProfileForm[0]);

  try {
    const response = await fetch("/api/update-profile", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (response.ok) {
      // Handle successful update
      console.log("Profile updated successfully!");
      hideModal(editProfileDialog, overlay);
      removeModalFromDOM(editProfileDialog, overlay);
    } else {
      // Handle error
      console.error("Error updating profile:", response.status);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}

$(document).on("click", ".follow-user-btn, .follow-btn", function () {
  handleFollowButtonClick(this);
});
