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
    `
    <div class="quote-box">
      <h3>Quote of the Day</h3>
      <p class="qod">“${qodQuote}”</p>
      <p class ="qodSource"> - ${qodAuthor}, ` +
    ` ${qodSource}</p>
    </div>
  `;

  // Wispi Box
  const quote = "Homo homini lupus est \n Man is wolf to man";
  const author = "";
  const source = "Latin Proverb";
  const wispiBox =
    `
  <div class="wispi-box">
    <div class="wispi-box-first-row">
      <div class="user-info">
        <img src="./assets/icon/profile_icon.svg" alt="User Profile Picture" class="profile-pic">
        <p><strong>User Name</strong></p>
      </div>
      <div class="wispi-time">
        <p>2h</p>
      </div>
    </div>
    <div class="wispi-content">
      <p class="wispi">“${quote}”</p>
      <p class="wispi-source"><b>Source:</b> ${author} ` +
    ` ${source}</p>
    </div>
    <div class="wispi-actions">
      <i class="like-icon">Like</i>
      <i class="share-icon">Repost</i>
    </div>
  </div>`;

  const switchPageBtn = exploreMode ? "Explore" : "For You";

  if (exploreMode) {
    return `
    <div class="feed-container">
        <div class="quote-section">
          ${quoteBox}
        </div>
        <div class="post-section">
        <div class="post-box">
          <i class="icon"><img src="./assets/icon/profile_icon.svg" alt="User Profile Picture"></i>
          <input type="text" placeholder="Share your wisp...">
          <button>Post</button>
        </div>
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
    return `
    <div class="feed-container">
        <div class="quote-section">
          ${quoteBox}
        </div>
        <div class="feed-section">
          <div class="wispi-box">
            <p><strong>User3333</strong>: This is a sample Post!</p>
          </div>
          <div class="wispi-box">
            <p><strong>User2</strong>: Another sample Post here.</p>
          </div>
          <div class="wispi-box">
            <p><strong>User1</strong>: This is a sample Post!</p>
          </div>
          <div class="wispi-box">
            <p><strong>User2</strong>: Another sample Post here.</p>
          </div>
          <div class="wispi-box">
            <p><strong>User1</strong>: This is a sample Post!</p>
          </div>
          <div class="wispi-box">
            <p><strong>User2</strong>: Another sample Post here.</p>
          </div>
        </div>
    </div>
    <button id="switchPageBtn" class="item">${switchPageBtn}</button>`;
  }
}
