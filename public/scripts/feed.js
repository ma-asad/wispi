let exploreMode = true;

export function getExploreMode() {
  return exploreMode;
}

export function setExploreMode(value) {
  exploreMode = value;
}

export function getFeed() {
  // Quote Box
  const qodQuote =
    "There Are Two Main Human Sins from Which All the Others Derive: Impatience and Indolence.";
  const qodAuthor = "Franz Kafka";
  const qodSource = "The Zurau Aphorisms";

  const quoteBox =
    /* html */
    `
    <div class="quote-box">
      <h3>Quote of the Day</h3>
      <p class="qod">“${qodQuote}”</p>
      <p class ="qodSource"> - ${qodAuthor}, ${qodSource}</p>
    </div>
  `;

  // Wispi Post
const wispiPost = /* html */ `
  <div class="post-box">
    <i class="icon"><img src="./assets/icon/profile_icon.svg" alt="User Profile Picture"></i>
    <input id="wispiPostInput" class="share-wisp-input" type="text" placeholder="Share your wisp...">
    <button class="share-post" >Post</button>
  </div>`;
  
  // Wispi Box
  const quote = `Homo homini lupus est. <br> Man is wolf to man Man is wolf to manMan is wolf to manMan is wolf to manMan is wolf to manMan is wolf to manMan is wolf to manMan is wolf to manMan is wolf to man`;
  const author = "";
  const source = "Latin Proverb";
  const wispiBox =
    /* html */
    `
  <div class="wispi-box">
    <div class="wispi-box-first-row">
      <div class="user-info">
        <img src="./assets/icon/profile_icon.svg" alt="User Profile Picture" class="profile-pic">
        <p class="wispi-username"><strong>User Name</strong></p>
      </div>
      <div class="wispi-time">
        <p>2h</p>
      </div>
    </div>
    <div class="wispi-content">
      <p class="wispi">“${quote}”</p>
      <div class="wispi-source-container">
        <p class="wispi-source"><b>Source:</b> ${author} ${source}</p>
      </div>
    </div>
    <div class="wispi-actions">
      <input class="like-button" type="image" src="./assets/icon/wispi-heart.svg"></input>
      <input class="repost-button" type="image" src="./assets/icon/repost.svg"></input>
    </div>
  </div>`;

  const switchPageBtn = exploreMode ? "Explore" : "For You";

  if (exploreMode) {
    return /* html */ `
    <div class="feed-container">
        <div class="quote-section">
          ${quoteBox}
        </div>
        <div class="post-section">
        ${wispiPost}
        </div>
        <div class="feed-section">
          ${wispiBox}
          ${wispiBox}
          ${wispiBox}
          ${wispiBox}
          ${wispiBox}
          ${wispiBox}
          ${wispiBox}
        </div>
    </div>
      <button id="switchPageBtn" class="item">${switchPageBtn}</button>`;
  } else {
    return /* html */ `
    <div class="feed-container">
        <div class="quote-section">
          ${quoteBox}
        </div>
        <div class="post-section">
        ${wispiPost}
        <p>For You</p>
        </div>
        <div class="feed-section">
          ${wispiBox}
          ${wispiBox}
          ${wispiBox}
          ${wispiBox}
          ${wispiBox}
          ${wispiBox}
          ${wispiBox}
        </div>
    </div>
    <button id="switchPageBtn" class="item">${switchPageBtn}</button>`;
  }
}
