const userSearchResult = /* html */ `
                <div class="search-result">
                    <div class="search-user-container">
                        <div class="search-user-info">
                            <img class="search-profile-pic" src="./assets/icon/profile_icon.svg" alt="User Profile Picture">
                            <div class="search-user-info-text">
                                <p class="search-wispi-username"><strong>@bing.bong</strong></p>
                                <p class="search-wispi-name">Asad Atterkhan</p>
                            </div>
                            </div>
                        <button class="search-follow-btn">Follow</button>
                    </div>
                </div>`;

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
            <div class="search-results">
                ${userSearchResult}
                ${userSearchResult}
                ${userSearchResult}
                ${userSearchResult}
                ${userSearchResult}
            </div>
        </div>
    </div>`;
}
