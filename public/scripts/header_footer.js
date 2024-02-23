export function getHeader() {
  return /* html */ `
<nav class="navBar">
  <div class="logo">
    <h1 class="logo">Wispi</h1>
  </div>
  <div class="navLinks">
    <a href="#/feed">
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.497.622c.83-.83 2.176-.83 3.006 0l14.875
    14.875a2.125 2.125 0 0 1-1.503 3.628H29.75v12.75A2.125 2.125 0 0 1 27.625 34h-4.25a2.125 2.125
    0 0 1-2.125-2.125V25.5a2.125 2.125 0 0 0-2.125-2.125h-4.25A2.125 2.125 0 0 0 12.75 25.5v6.375A2.125
    2.125 0 0 1 10.625 34h-4.25a2.125 2.125 0 0 1-2.125-2.125v-12.75H2.125a2.125 2.125 0 0 1-1.503-3.628L15.497.622Z"
    fill="#A2968C"/>
    </svg>
    </a>
    <a id="nav-wispi-post" href="#/feed">
    <svg width="40" height="34" viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.126 34c-.79 0-1.343-.663-1.343-1.407 0-.529.278-1.096.955-1.494 3.436-2.012 7.414-8.98
    7.414-13.277-5.796.196-8.314-5.486-8.314-9.048C.838 4.511 4.178 0 9.118 0c6.227 0 9.281 5.412 9.281
    11.277C18.4 23.987 5.266 34 2.126 34Zm20.818 0c-.788 0-1.343-.663-1.343-1.407 0-.529.278-1.096.955-1.494
    3.436-2.012 7.414-8.98 7.414-13.277-5.794.196-8.313-5.486-8.313-9.048C21.657 4.511 24.998 0 29.934 0c6.229
    0 9.282 5.412 9.282 11.277C39.217 23.987 26.087 34 22.944 34Z" fill="#A2968C"/>
    </svg>
    </a>
    <a id="nav-notif" href="#/feed">
    <svg width="39" height="34" viewBox="0 0 39 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m18.585 33.791-.012-.007-.046-.024a53.523 53.523 0 0 1-9.092-6.27C4.966 23.634 0 17.852
    0 10.926A10.928 10.928 0 0 1 19.428 4.06a10.928 10.928 0 0 1 19.428 6.868c0 6.926-4.964 12.708-9.435
    16.562a53.545 53.545 0 0 1-9.092 6.27l-.046.025-.013.007h-.004a1.794 1.794 0 0 1-1.676.003l-.005-.003Z"
    fill="#A2968C"/>
    </svg>
    </a>
    <a href="#/search" id = "search">
    <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.856 37 27.75 26.895m0 0A14.583 14.583 0 1 0 7.127 6.271a14.583 14.583 0 0 0 20.624
    20.624Z" stroke="#A2968C" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </a>
    <a href="#/profile">
    <svg width="29" height="34" viewBox="0 0 29 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.85 12.75A6.375 6.375 0 1 0 14.848 0a6.375 6.375 0 0 0 0 12.75ZM.961 26.548a2.614 2.614
    0 0 0 .872 3A21.16 21.16 0 0 0 14.849 34c4.909 0 9.43-1.666 13.029-4.462.913-.708 1.283-1.92.866-2.997a14.879
    14.879 0 0 0-27.782.007Z" fill="#A2968C"/>
    </svg>
    </a>
  </div>
  <div class="setting">
    <a href="#/settings">
    <svg width="50" height="26" viewBox="0 0 50 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y=".5" width="50" height="5" rx="2.5" fill="#635242"/><rect x="20" y="10.5" width="30"
    height="5" rx="2.5" fill="#635242"/><rect x="35" y="20.5" width="15" height="5" rx="2.5" fill="#635242"/>
    </svg>
    </a>
  </div>
</nav>
`;
}

export function getFooter(page) {
  if (page === "login") {
    return /* html */ `
    <p>Privacy | Terms | Wispi &copy; 2024</p>`;
  } else {
    return /* html */ `
    <quote id="footer-quote">“Wisp of Wisdom, Quotes of ‘I’llumination”</quote><br>
    <p>Privacy | Terms | Wispi &copy; 2024</p>
    `;
  }
}
