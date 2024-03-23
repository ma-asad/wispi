import { createWispiBox } from "./wispiBox.js";

let exploreMode = true;

export function getExploreMode() {
  return exploreMode;
}

export function setExploreMode(value) {
  exploreMode = value;
}

function getQuoteOfTheDay(qodQuote, qodAuthor, qodSource) {
  const quoteBox =
    /* html */
    `
    <div class="quote-box">
      <h3>Quote of the Day</h3>
      <p class="qod">“${qodQuote}”</p>
      <p class ="qodSource"> - ${qodAuthor}, ${qodSource}</p>
    </div>
    `;
  return quoteBox;
}

export async function getFeed() {
  // Fetch the post data from the database
  const response = await fetch("/api/get-wispis");
  const data = await response.json();

  // Create wispi boxes from data
  const wispiBoxes = data
    .map((item) =>
      createWispiBox(item.username, item.quote, item.author, item.source, item.createdAt)
    )
    .join("");

  // Quote of the Day
  const quoteofTheDay = getQuoteOfTheDay(
    "There Are Two Main Human Sins from Which All the Others Derive: Impatience and Indolence.",
    "Franz Kafka",
    "The Zurau Aphorisms"
  );

  // Share a Wisp
  const wispiPost = /* html */ `
    <div id="wispi-post-input" class="post-box">
    <i class="icon"><img src="./assets/icon/profile_icon.svg" alt="User Profile Picture"></i>
    <input class="share-wisp-input" type="text" placeholder="Share your wisp...">
    <button class="share-post-btn" >Post</button>
    </div>`;

  // switch page button from "Explore" to "For You"
  const switchPageBtn = exploreMode ? "Explore" : "For You";

  if (exploreMode) {
    return /* html */ `
    <div id="forYou" class="feed-container">
        <div class="quote-section">
          ${quoteofTheDay}
        </div>
        <div class="post-section">
        ${wispiPost}
        </div>
        <div class="feed-section">
          ${wispiBoxes}
        </div>
    </div>
      <div class="switch-page-btn">
      <button id="switchPageBtn">${switchPageBtn}</button>
      </div>`;
  } else {
    return /* html */ `
    <div id="forYou" class="feed-container">
        <div class="quote-section">
          ${quoteofTheDay}
        </div>
        <div class="post-section">
        ${wispiPost}
        </div>
        <div class="feed-section">
          ${wispiBoxes}
        </div>
    </div>
    <div class="switch-page-btn">
      <button id="switchPageBtn">${switchPageBtn}</button>
    </div>`;
  }
}
