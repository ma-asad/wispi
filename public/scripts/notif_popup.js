import {
  appendModalToElement,
  selectModalElements,
  showModal,
  closeModalOnCloseButton,
  closeModalOnOutsideClick,
} from "./popup.js";

function notifications(username, notifContent, notifTime) {
  const notifContentHTML = /* html */ `
    <div class="notif-popup-content">
        <div class="user-info">
            <img src="./assets/icon/profile_icon.svg" alt="User Profile Picture" class="profile-pic">
            <p class="wispi-username"><strong>${username}</strong></p>
        </div>
        <div class="notif-content">
            <p class="notif-text">${notifContent}</p>
            <p class="notif-time">${notifTime}</p>
        </div>
    </div>
    `;
  return notifContentHTML;
}

const notif1 = notifications("bing.bong", "liked your Wispi", "2h");
const notif2 = notifications("bimbim.bambam", "reposted your Wispi", "3h");
const notif3 = notifications("mrs.lego", "commented on your Wispi", "4h");
const notif4 = notifications("sun.dial", "liked your Wispi", "5h");

export function openNotificationsPopup() {
  // HTML for the modal
  const notificationsPopupHTML = /* html */ `
    <div id="overlay" class="overlay"></div>
    <dialog class="notif-popup-modal" id="notificationsPopup">
        <div class="notif-popup-container">
            <div class="notif-popup-header">
              <h2>Notifications</h2>
              <span class="close-button">&times;</span>
            </div>
            <div class="notif-popup-content-container">
                ${notif1}
                ${notif2}
                ${notif3}
                ${notif4}
            </div>
      </div>
    </dialog>
  `;

  // Modal
  appendModalToElement(notificationsPopupHTML, "main");

  const {
    modal: notificationsPopup,
    closeButton,
    overlay,
  } = selectModalElements("#notificationsPopup", ".close-button", "#overlay");

  showModal(notificationsPopup, overlay);
  closeModalOnCloseButton(notificationsPopup, overlay, closeButton);
  closeModalOnOutsideClick(notificationsPopup, overlay);
}
