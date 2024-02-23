export function createWispiBox(username,quote, author, source) {

  return /* html */ `
  <div class="wispi-box">
    <div class="wispi-box-first-row">
      <div class="user-info">
        <img src="./assets/icon/profile_icon.svg" alt="User Profile Picture" class="profile-pic">
        <p class="wispi-username"><strong>${username}</strong></p>
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
        <div class="wispi-action-icons">
            <input class="like-button" type="image" src="./assets/icon/like-icon.svg"></input>
            <input class="repost-button" type="image" src="./assets/icon/repost.svg"></input>
        </div>
    </div>
  </div>`;
}

  // Wispi Box

  // Wispi Box 1
  export const wispiBox1 = createWispiBox(
    "bing.bong",
    "Homo homini lupus est. <br> Man is wolf to man",
    "",
    "Latin Proverb"
  );

  // Wispi Box 2
  export const wispiBox2 = createWispiBox(
    "bimbim.bambam",
    "What is evil? Whatever springs from weakness",
    "Nietzche",
    "Beyond Good and Evil"
  );

  // Wispi Box 3
  export const wispiBox3 = createWispiBox(
    "mrs.lego",
    "Those Who Cannot Remember the Past Are Condemned to Repeat It",
    "George Santayana",
    ""
  );

  // Wispi Box 3
  export const wispiBox4 = createWispiBox(
    "sun.dial",
    "If you make a mistake and do not correct it, this is called a mistake.",
    "Confucious",
    "The Analects"
  )