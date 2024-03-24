export function appendModalToElement(modalHTML, elementSelector) {
  const element = $(elementSelector);
  element.append(modalHTML);
}

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

export function showModal(modal, overlay) {
  modal.show();
  overlay.show();
}

export function hideModal(modal, overlay) {
  modal.hide();
  overlay.hide();
}

export function removeModalFromDOM(modal, overlay) {
  modal.remove();
  overlay.remove();
}

export function closeModalOnCloseButton(modal, overlay, closeButton) {
  closeButton.click(function () {
    hideModal(modal, overlay);
    removeModalFromDOM(modal, overlay);
  });
}

export function closeModalOnOutsideClick(modal, overlay) {
  $(window).click(function (event) {
    if (event.target === modal[0] || event.target === overlay[0]) {
      hideModal(modal, overlay);
      removeModalFromDOM(modal, overlay);
    }
  });
}
