import {
  appendModalToElement,
  selectModalElements,
  showModal,
  closeModalOnCloseButton,
  closeModalOnOutsideClick,
} from "./popup.js";

export function openSettingsPopup() {
  const settingsPopupHTML = /* html */ `
    <div id="overlay" class="overlay"></div>
    <dialog class="settings-popup-modal" id="settingsPopup">
        <div class="settings-popup-container">
            <div class="settings-popup-content-container">
                <button id="logoutButton">Log out</button>
            </div>
      </div>
    </dialog>
  `;

  // modal
  appendModalToElement(settingsPopupHTML, "main");

  const {
    modal: settingsPopup,
    closeButton,
    overlay,
  } = selectModalElements("#settingsPopup", ".close-button", "#overlay");

  showModal(settingsPopup, overlay);
  closeModalOnCloseButton(settingsPopup, overlay, closeButton);
  closeModalOnOutsideClick(settingsPopup, overlay);

  // Redirect to login page when "Log out" is clicked
  $("#logoutButton").click(function () {
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Failed to log out");
        }
      })
      .then((message) => {
        alert(message); // Display the message to the user
        window.location.href = "#/login"; // Redirect to the login page
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}
