// Wispi Box
const quote = `Homo homini lupus est. <br> Man is wolf to man Man is wolf to manMan is wolf to manMan is wolf to manMan is wolf to manMan is wolf to manMan is wolf to manMan is wolf to manMan is wolf to man`;
const author = "";
const source = "Latin Proverb";
const wispiBox =
  /* html */
  `
  <div class="wispi-box">
    <div class="wispi-box-first-row">
      <div class="user-info">
        <img src="./assets/icon/profile_icon.svg" alt="User Profile Picture" class="profile-pic">
        <p class="wispi-username"><strong>User Name</strong></p>
      </div>
      <div class="wispi-time">
        <p>2h</p>
      </div>
    </div>
    <div class="wispi-content">
      <p class="wispi">“${quote}”</p>
      <div class="wispi-source-container">
        <p class="wispi-source"><b>Source:</b> ${author} ${source}</p>
      </div>
    </div>
    <div class="wispi-actions">
      <input class="like-button" type="image" src="./assets/icon/like-icon.svg"></input>
      <input class="repost-button" type="image" src="./assets/icon/repost.svg"></input>
    </div>
  </div>`;

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
        ${wispiBox}
    </div>
        <div class="profile-activities-reposts">
        ${wispiBox}
    </div>
  </div>
</div>`;

  // Return the HTML string
    return profilePageHTML;
    
}

