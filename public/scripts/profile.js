import { createWispiBox } from "./wispiBox.js";

// Wispi Box

  // Wispi Box 1
  const wispiBox1 = createWispiBox(
    "bing.bong",
    "Homo homini lupus est. <br> Man is wolf to man",
    "",
    "Latin Proverb"
  );

  // Wispi Box 2
  const wispiBox2 = createWispiBox(
    "bimbim.bambam",
    "What is evil? Whatever springs from weakness",
    "Nietzche",
    "Beyond Good and Evil"
  );

  // Wispi Box 3
  const wispiBox3 = createWispiBox(
    "mrs.lego",
    "Those Who Cannot Remember the Past Are Condemned to Repeat It",
    "George Santayana",
    ""
  );

export function getProfilePage() {
  const profilePageHTML = /* html */ `
<div class="profile-page-container">
    <div class="profile-details-container">
        <div class="profile-details-first-column">
            <div class="profile-name-username-container">
                <p class="profile-name">Asad Atterkhan Atterkhan Atterkhan</p>
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
    </div>
  </div>
</div>`;

  // Return the HTML string
  return profilePageHTML;
}
