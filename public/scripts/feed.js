import { createWispiBoxesFromData } from "./wispiBox.js";

let exploreMode = true;

export function getExploreMode() {
  return exploreMode;
}

export function setExploreMode(value) {
  exploreMode = value;
}


async function getQuoteOfTheDay() {
  try {
    // Make a request to the /quote-of-the-day endpoint
    const response = await fetch("/api/quote-of-the-day");

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("An error occurred while getting quote of the day");
    }

    // Parse the response body as JSON
    const { qodQuote, qodSource } = await response.json();

    const quoteBox =
      /* html */
      `
    <div class="quote-box">
      <h3>Quote of the Day</h3>
      <p class="qod">“${qodQuote}”</p>
      <p class ="qodSource"> - ${qodSource}</p>
    </div>
    `;
    // Return the formatted quote
    return quoteBox;
  } catch (error) {
    console.error("Error getting quote of the day:", error);
    return "";
  }
}

export async function getFeed() {
  // Determine the endpoint based on the exploreMode variable
  const endpoint = exploreMode ? "/api/get-wispis" : "/api/get-followed-wispis";

  // Fetch the post data from the database
  const response = await fetch(endpoint);
  const data = await response.json();

  // Create the WispiBoxes from the data
  const wispiBoxes = await createWispiBoxesFromData(data);

  // Quote of the Day
  const quoteofTheDay = await getQuoteOfTheDay();

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


