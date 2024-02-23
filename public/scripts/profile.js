import {
  wispiBox1,
  wispiBox2,
  wispiBox3,
  wispiBox4,
} from "./wispiBox.js";

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
                <img src="../public/assets/icon/big_profile_icon.svg" alt="Profile Picture" />
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
