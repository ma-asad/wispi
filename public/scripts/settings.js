export function openSettingsPopup() {
  const settingsPopupHTML = /* html */ `
    <div id="overlay" class="overlay"></div>
    <dialog class="settings-popup-modal" id="settingsPopup">
        <div class="settings-popup-container">
            <div class="settings-popup-header">
              <h2>Settings</h2>
              <span class="close-button">&times;</span>
            </div>
            <div class="settings-popup-content-container">
                <button id="logoutButton">Log out</button>
            </div>
      </div>
    </dialog>
  `;

  // Select the <main> element
  const mainElement = $("main");

  // Append the modal to the <main> element
  mainElement.append(settingsPopupHTML);

  // Select the modal, the close button, and the overlay
  const settingsPopup = $("#settingsPopup");
  const closeButton = $(".close-button");
  const overlay = $("#overlay");

  // Display the modal and the overlay
  settingsPopup.show();
  overlay.show();

  // Close the modal when 'x' is clicked
  closeButton.click(function () {
    settingsPopup.hide();
    overlay.hide();
    settingsPopup.remove(); // Remove the modal from the DOM
    overlay.remove(); // Remove the overlay from the DOM
  });

  // Close the modal when clicking outside of it
  $(window).click(function (event) {
    if (event.target == settingsPopup[0] || event.target == overlay[0]) {
      settingsPopup.hide();
      overlay.hide();
      settingsPopup.remove(); // Remove the modal from the DOM
      overlay.remove(); // Remove the overlay from the DOM
    }
  });

  // Redirect to login page when "Log out" is clicked
  $("#logoutButton").click(function () {
    window.location.hash = "#/login";
  });
}