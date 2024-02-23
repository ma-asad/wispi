import { createWispiBox } from "./wispiBox.js";

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

  // Share a Wisp
  const wispiPost = /* html */ `
    <div id="wispi-post-input" class="post-box">
    <i class="icon"><img src="./assets/icon/profile_icon.svg" alt="User Profile Picture"></i>
    <input class="share-wisp-input" type="text" placeholder="Share your wisp...">
    <button class="share-post-btn" >Post</button>
    </div>`;

  // Wispi Box

  // Wispi Box 1
  const wispiBox1 = createWispiBox(
    "bing.bong",
    "Homo homini lupus est. <br> Man is wolf to man",
    "",
    "Latin Proverb"
  );

  // Wispi Box 2
  const wispiBox2 = createWispiBox(
    "bimbim.bambam",
    "What is evil? Whatever springs from weakness",
    "Nietzche",
    "Beyond Good and Evil"
  );

  // Wispi Box 3
  const wispiBox3 = createWispiBox(
    "mrs.lego",
    "Those Who Cannot Remember the Past Are Condemned to Repeat It",
    "George Santayana",
    ""
  );

  // Wispi Box 3
  const wispiBox4 = createWispiBox(
    "sun.dial",
    "If you make a mistake and do not correct it, this is called a mistake.",
    "Confucious",
    "The Analects"
  )
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
          ${wispiBox1}
          ${wispiBox2}
          ${wispiBox3}
          ${wispiBox1}
          ${wispiBox1}
          ${wispiBox1}
          ${wispiBox1}
        </div>
    </div>
      <div class="switch-page-btn">
      <button id="switchPageBtn">${switchPageBtn}</button>
      </div>`;
  } else {
    return /* html */ `
    <div class="feed-container">
        <div class="quote-section">
          ${quoteBox}
        </div>
        <div class="post-section">
        ${wispiPost}
        </div>
        <div class="feed-section">
          ${wispiBox4}
          ${wispiBox1}
          ${wispiBox2}
          ${wispiBox1}
          ${wispiBox2}
          ${wispiBox1}
          ${wispiBox2}
        </div>
    </div>
    <div class="switch-page-btn">
      <button id="switchPageBtn" class="item">${switchPageBtn}</button>
    </div>`;
  }
}
