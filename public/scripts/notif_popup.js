import {
  appendModalToElement,
  selectModalElements,
  showModal,
  closeModalOnCloseButton,
  closeModalOnOutsideClick,
} from "./popup.js";
import { timeAgo } from "./wispiBox.js";

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

export async function openNotificationsPopup() {
  // Fetch the notifications from the API
  const response = await fetch("/api/notifications");
  const data = await response.json();

  if (!data.success) {
    console.error("Error fetching notifications:", data.message);
    return;
  }

  // Generate the HTML for each notification
  let notificationsHTML = "";
  if (data.notifications.length > 0) {
    notificationsHTML = data.notifications
      .map((notif) => {
        const notifTime = timeAgo(new Date(notif.date));
        return notifications(notif.from, notif.type, notifTime);
      })
      .join("");
  } else {
    notificationsHTML = "<p>No notifications yet.</p>";
  }

  // HTML for the modal
  const notificationsPopupHTML = /* html */ `
    <div id="overlay" class="overlay"></div>
    <dialog class="notif-popup-modal" id="notificationsPopup">
        <div class="notif-popup-container">
            <div class="notif-popup-header">
            <div class="header-notif-clear">
              <h2>Notifications</h2>
              <button id="clearNotificationsButton" class="clear-notif-btn">clear all</button>
            </div>
              <span class="close-button">&times;</span>
            </div>
            <div class="notif-popup-content-container">
                ${notificationsHTML}
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

  // Add an event listener to the "Clear All" button
  document
    .getElementById("clearNotificationsButton")
    .addEventListener("click", async () => {
      const response = await fetch("/api/notifications/clear", {
        method: "POST",
      });
      const data = await response.json();

      if (!data.success) {
        console.error("Error clearing notifications:", data.message);
        return;
      }

      // Close the notifications popup
      closeModalOnCloseButton(notificationsPopup, overlay, closeButton);
    });

  showModal(notificationsPopup, overlay);
  closeModalOnCloseButton(notificationsPopup, overlay, closeButton);
  closeModalOnOutsideClick(notificationsPopup, overlay);
}
