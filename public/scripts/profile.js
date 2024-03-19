import { wispiBox1, wispiBox2, wispiBox3, wispiBox4 } from "./wispiBox.js";

export function getProfilePage() {
  const profilePageHTML = /* html */ `
<div class="profile-page-container">
    <div class="profile-details-container">
        <div class="profile-details-first-column">
            <div class="profile-name-username-container">
                <p class="profile-name">Asad Atterkhan</p>
                <p class="profile-username">@bing.bong</p>
            </div>
            <div class="profile-bio-container">
                <p class="profile-bio">Middlesex Univeristy | M00952726</p>
            </div>
            <div class="profile-actions">
                <button class="follow-btn">99 Followers</button>
                <button class="follow-btn">0 Following</button>
                <button class="edit-profile-btn">Edit Profile</button>
            </div>
        </div>
        <div class="profile-details-second-column">
            <div class="profile-image">
                <img src="./public/assets/icon/big_profile_icon.svg" alt="Profile Picture" />
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
        ${wispiBox1}
    </div>
        <div class="profile-activities-reposts">
        ${wispiBox2}
        ${wispiBox3}
    </div>
  </div>
</div>`;

  // Return the HTML string
  return profilePageHTML;
}

export function openEditProfileModal() {
  // Create a dialog with a form
  const editProfileHTML = /* html */ `
    <div id="editProfileDialog" class="edit-profile-dialog">
      <form class="edit-profile-form">
        <label for="profile-picture">Profile Picture:</label>
        <input type="file" id="profile-picture" name="profile-picture" accept="image/*">
        
        <label for="bio">Bio:</label>
        <textarea id="bio" name="bio"></textarea>
        
        <button type="button" class="save-btn">Save</button>
        <button type="button" class="cancel-btn">Cancel</button>
      </form>
    </div>
    <div id="overlay"></div>
  `;

  // Select the <main> element
  const mainElement = $("main");

  // Append the modal and the overlay to the <main> element
  mainElement.append(editProfileHTML);

  // Select the modal, the close button, and the overlay
  const editProfileDialog = $("#editProfileDialog");
  const cancelButton = $(".cancel-btn");
  const overlay = $("#overlay");

  // Display the modal and the overlay
  editProfileDialog.show();
  overlay.show();

  // Close the modal when 'Cancel' is clicked
  cancelButton.click(function () {
    editProfileDialog.hide();
    overlay.hide();
    editProfileDialog.remove(); // Remove the modal from the DOM
    overlay.remove(); // Remove the overlay from the DOM
  });

  // Add event listener to the "Save" button
  $(".save-btn").click(saveChanges);
}

function saveChanges() {
  // Collect the data from the form fields and use it to update the profile
  // This will depend on how you're storing and updating the profile data
}