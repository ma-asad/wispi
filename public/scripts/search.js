import {
  wispiBox1,
  wispiBox2,
  wispiBox3,
  wispiBox4,
} from "./wispiBox.js";

export function userSearchResult(username, fName, lName, followStatus = "Follow") {
  return /* html */ `
    <div class="search-result">
        <div class="search-user-container">
            <div class="search-user-info">
                <img class="search-profile-pic" src="./assets/icon/profile_icon.svg" alt="User Profile Picture">
                <div class="search-user-info-text">
                    <p class="search-wispi-username"><strong>${username}</strong></p>
                    <p class="search-wispi-name">${fName} ${lName}</p>
                </div>
            </div>
            <button class="search-follow-btn status">${followStatus}</button>
        </div>
    </div>`;
}

const user1 = userSearchResult("bing.bong", "Asad", "Atterkhan");
const user2 = userSearchResult("bimbim.bambam", "BimBim", "BamBam", "Following");
const user3 = userSearchResult("mrs.lego", "Mrs.", "Lego", "Following");
const user4 = userSearchResult("sun.dial", "Sun", "Dial");
const user5 = userSearchResult("stress.boi", "Stress", "Boi");

export function getSearchPage() {
  return /* html */ `
    <div class="search-page-container">
        <div class="search-bar-container">
            <input class="search-bar" type="text" placeholder="Search" />
        </div>
        <div class="switch-search-container-btn">
            <button class="switch-search-btn" id="switch-search-btn">Accounts</button>
        </div>
        <hr>
        <div class="search-results-container">
            <div class="search-results-user">
                ${user1}
                ${user2}
                ${user3}
                ${user4}
                ${user5}
            </div>
            <div class="search-results-post" style="display: none;">
                ${wispiBox2}
                ${wispiBox3}
                ${wispiBox4}
            </div>
        </div>
    </div>`;
}
