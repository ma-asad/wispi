// Appends the given HTML string to the selected element
export function appendModalToElement(modalHTML, elementSelector) {
  const element = $(elementSelector);
  element.append(modalHTML);
}

// Selects the modal, close button, and overlay elements from the DOM
export function selectModalElements(
  modalSelector,
  closeButtonSelector,
  overlaySelector
) {
  const modal = $(modalSelector);
  const closeButton = $(closeButtonSelector);
  const overlay = $(overlaySelector);
  return { modal, closeButton, overlay };
}

// Displays the modal and the overlay
export function showModal(modal, overlay) {
  modal.show();
  overlay.show();
}

// Hides the modal and the overlay
export function hideModal(modal, overlay) {
  modal.hide();
  overlay.hide();
}

// Removes the modal and the overlay from the DOM
export function removeModalFromDOM(modal, overlay) {
  modal.remove();
  overlay.remove();
}

// Closes the modal when the close button is clicked
export function closeModalOnCloseButton(modal, overlay, closeButton) {
  closeButton.click(function () {
    hideModal(modal, overlay);
    removeModalFromDOM(modal, overlay);
  });
}

// Closes the modal when clicking outside of it
export function closeModalOnOutsideClick(modal, overlay) {
  $(window).click(function (event) {
    if (event.target === modal[0] || event.target === overlay[0]) {
      hideModal(modal, overlay);
      removeModalFromDOM(modal, overlay);
    }
  });
}
