export function openWispisPostPopup() {
  // Create the modal HTML
  const wispiPostPopupHTML = /* html */ `
    <div id="overlay" class="overlay"></div>
    <dialog class="wispi-post-popup" id="wispiPostPopup">
      <div class="wispi-popup-grid-container">
        <div class="wispi-popup-text-area">
          <div class="user-info">
            <img class="profile-pic" src="./assets/icon/profile_icon.svg" alt="User Profile Picture">
            <p class="wispi-username"><strong>User Name</strong></p>
          </div>
          <div class="wispi-post-content">
            <textarea id="wispiPostInput" class="wispi-post-input" placeholder="What's on your mind?"></textarea>
          </div>
        </div>
        <div class="wispi-popup-submission-area">
            <span class="close-button">\u00D7</span>
            <div class="wispi-popup-source">
            <h4>Author</h4>
            <input type="text" class="wispi-source-input" placeholder="name of author">
            <span class="line"></span>
            </div>
            <div class="wispi-popup-source">
            <h4>Source</h4>
            <input type="text" class="wispi-source-input" placeholder="source of your Wispi">
            <span class="line"></span>
            </div>
            <div class="wispi-popup-submit">
            <button class="wispi-post-submit-btn">Post</button>
            </div>
        </div>
      </div>
    </dialog>`;

  // Select the <main> element
  const mainElement = $("main");

  // Append the modal to the <main> element
  mainElement.append(wispiPostPopupHTML);

  // Select the modal, the close button, and the overlay
  const wispiPostPopup = $("#wispiPostPopup");
  const closeButton = $(".close-button");
  const overlay = $("#overlay");

  // Display the modal and the overlay
  wispiPostPopup.show();
  overlay.show();

  // Close the modal when 'x' is clicked
  closeButton.click(function () {
    wispiPostPopup.hide();
    overlay.hide();
    wispiPostPopup.remove(); // Remove the modal from the DOM
    overlay.remove(); // Remove the overlay from the DOM
  });

  // Close the modal when clicking outside of it
  $(window).click(function (event) {
    if (event.target == wispiPostPopup[0] || event.target == overlay[0]) {
      wispiPostPopup.hide();
      overlay.hide();
      wispiPostPopup.remove(); // Remove the modal from the DOM
      overlay.remove(); // Remove the overlay from the DOM
    }
  });
}
