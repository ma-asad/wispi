import {
  appendModalToElement,
  selectModalElements,
  showModal,
  hideModal,
  removeModalFromDOM,
} from "./popup.js";

export async function getProfilePage() {
  // Fetch the user's data from the server
  const response = await fetch("/api/user/me");
  const user = await response.json();

  // Count the number of followers and following
  const followersCount = user.followers.length;
  const followingCount = user.following.length;

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
                <button class="edit-profile-btn">Edit Profile</button>
            </div>
        </div>
        <div class="profile-details-second-column">
            <div class="profile-image">
                <img src="${user.profilePicture}" alt="Profile Picture" class="profile-picture"/>
            </div>
        </div>
    </div>
    <div class="profile-activities-container">
        <div class="profile-activities-header">
          <button id="profile-wispis-btn" class="profile-activities-header-btn active">Wispis</button>
          <button id="profile-reposts-btn" class="profile-activities-header-btn">Reposts</button>
        </div>
    <div class="profile-activities-content">
        <div class="profile-activities-wispis">
        </div>
    </div>
        <div class="profile-activities-reposts">
        </div>
    </div>
  </div>
</div>`;

  console.log(user.profilePicture);
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
      credentials: "include", // Include cookies (for session management)
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
