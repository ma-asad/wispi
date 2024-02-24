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
            <button class="like-button" >
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m7.463 13.423.006.003.008.005.014.006a1.12 1.12 0 0 0 .911.047h.03l.1-.058.005-.003.006-.004a20 
                  20 0 0 0 3.405-2.309l.002-.001c1.654-1.402 3.61-3.597 3.61-6.296a4.33 4.33 0 0 0-.817-2.524A4.44 4.44 0 
                  0 0 12.594.69 4.5 4.5 0 0 0 9.902.606C9.183.806 8.53 1.18 8 1.691A4.46 4.46 0 0 0 6.098.606a4.5 4.5 0 0 
                  0-2.693.085A4.44 4.44 0 0 0 1.257 2.29a4.32 4.32 0 0 0-.816 2.524c0 2.699 1.956 4.894 3.61 6.296v.001a20 
                  20 0 0 0 3.407 2.31z" stroke="#645445" stroke-width=".882"/>
              </svg>

            </button>
            <button class="repost-button">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#a)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.5q1.823 0 3.604.162a.68.68 0 0 1 .615.597q.187 1.557.25 3.15l-1.689-1.69a.75.75 0 0 0-1.06 1.061l2.999 3a.75.75 0 0 0 1.06 0l3.001-3a.75.75 0 1 0-1.06-1.06l-1.748 1.747a41 41 0 0 0-.264-3.386 2.18 2.18 0 0 0-1.97-1.913 41.5 41.5 0 0 0-7.477 0 2.18 2.18 0 0 0-1.969 1.913q-.096.8-.16 1.61a.75.75 0 0 0 1.495.12q.062-.78.154-1.552a.68.68 0 0 1 .615-.597A40 40 0 0 1 9 1.5M4.281 6.22a.75.75 0 0 0-1.06 0l-3.001 3a.75.75 0 0 0 1.06 1.06l1.748-1.747q.063 1.712.264 3.386a2.18 2.18 0 0 0 1.97 1.913 41.5 41.5 0 0 0 7.477 0 2.18 2.18 0 0 0 1.969-1.913q.096-.801.16-1.61a.75.75 0 1 0-1.495-.12q-.062.78-.154 1.552a.68.68 0 0 1-.615.597 40 40 0 0 1-7.208 0 .68.68 0 0 1-.615-.597 40 40 0 0 1-.25-3.15l1.689 1.69A.75.75 0 1 0 7.28 9.22z" fill="#645445"/>
                  </g>
                  <defs>
                      <clipPath id="a">
                          <path fill="#fff" d="M0 0h18v14H0z"/>
                      </clipPath>
                  </defs>
              </svg>
            </button>
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