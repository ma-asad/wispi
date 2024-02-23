// Import necessary functions and constants
import { getLoginForm, getSignupForm } from "./scripts/login.js";
import { getHeader, getFooter } from "./scripts/header_footer.js";
import { getExploreMode, setExploreMode, getFeed } from "./scripts/feed.js";
import { openWispisPostPopup } from "./scripts/wispi_popup.js";
import { openNotificationsPopup } from "./scripts/notif_popup.js";
import { getSearchPage } from "./scripts/search.js"
import { getProfilePage } from "./scripts/profile.js";

document.addEventListener("DOMContentLoaded", () => {
  navigateTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});

function navigateTo(hash) {
  switch (hash) {
    case "#/signup":
      loadSignupPage();
      break;
    case "#/login":
      loadLoginPage();
      break;
    case "#/feed":
      loadFeedPage();
      break;
    case "#/search":
      loadSearchPage();
      break;
    case "#/profile":
      loadProfilePage();
      break;
    case "#/settings":
      loadSettingsPage();
      break;
    // case "#/test-web-service":
    //   loadTestWebServicePage();
    //   break;
    default:
      loadFeedPage();
      break;
  }
}

function renderHeader() {
  return getHeader();
}

function renderFooter(page = null) {
  return getFooter(page);
}

function loadPageContent(content, includeHeader = true, page = null) {
  const app = $("#app");
  app.html(content);

  const footerElement = $("footer");

  if (includeHeader) {
    const headerElement = $("header");
    headerElement.html(renderHeader());
    footerElement.html(renderFooter(page));
  } else {
    $("header").remove();
    footerElement.html(renderFooter("login"));
  }

  // event listener for the "nav-wispi-post" element
  $("#nav-wispi-post").click((event) => {
    event.preventDefault();
    openWispisPostPopup();
  });

  // event delegation for the "wispi-post-input" element
  app.on("click", "#wispi-post-input", (event) => {
    event.preventDefault();
    openWispisPostPopup();
  });

  $("#nav-notif").click((event) => {
    event.preventDefault();
    openNotificationsPopup();
  });
}

function loadLoginPage() {
  const newDiv = document.createElement("div");
  document.body.appendChild(newDiv);
  const loginContent = getLoginForm();
  loadPageContent(loginContent, false);
}

function loadSignupPage() {
  const signupContent = getSignupForm();
  loadPageContent(signupContent, false);
}

function loadFeedPage() {
  const feedContent = getFeed();
  loadPageContent(feedContent);

  // Use jQuery to add the event listener
  $("#switchPageBtn").click(function () {
    setExploreMode(!getExploreMode());
    loadFeedPage();
  });
}

function loadSearchPage() {
  const searchContent = getSearchPage();
  loadPageContent(searchContent);

  $(document).on("click", ".search-follow-btn", function () {
    var $this = $(this);
    var text = $this.text();
    $this.text(text == "Follow" ? "Following" : "Follow");
  });

  $(document).on("click", "#switch-search-btn", function () {
    var $this = $(this);
    var text = $this.text();
    $this.text(text == "Accounts" ? "Posts" : "Accounts");

    $(".search-results-user").toggle();
    $(".search-results-post").toggle();
  });
}

function loadProfilePage() {
  const profileContent = getProfilePage();
  loadPageContent(profileContent);

  $(document).ready(function () {
    // Hide the reposts div initially
    $(".profile-activities-reposts").hide();

    $("#profile-wispis-btn").click(function () {
      $(".profile-activities-wispis").show();
      $(".profile-activities-reposts").hide();
      $(this).addClass("active");
      $("#profile-reposts-btn").removeClass("active");
    });

    $("#profile-reposts-btn").click(function () {
      $(".profile-activities-reposts").show();
      $(".profile-activities-wispis").hide();
      $(this).addClass("active");
      $("#profile-wispis-btn").removeClass("active");
    });
  });
}

// function loadTestWebServicePage() {
//   const testWebServiceContent = `<div>
//                                        <h2>Test Web-Service Page</h2>
//                                        <button id="getBtn">Send GET Request</button>
//                                        <button id="postBtn">Send POST Request</button>
//                                        <div id="response"></div>
//                                    </div>`;
//   loadPageContent(testWebServiceContent);

//   document.getElementById("getBtn").addEventListener("click", sendGetRequest);
//   document.getElementById("postBtn").addEventListener("click", sendPostRequest);
// }

// function sendGetRequest() {
//   fetch("/test-web-service")
//     .then((response) => response.json())
//     .then((data) => {
//       const responseContainer = document.getElementById("response");
//       responseContainer.innerHTML = ""; // Clear previous content

//       if (Array.isArray(data) && data.length > 0) {
//         // Iterate over each data item and create structured HTML
//         data.forEach((item, index) => {
//           const itemContainer = document.createElement("div");
//           itemContainer.classList.add(
//             "data-item",
//             "border",
//             "p-3",
//             "m-2",
//             "rounded"
//           );

//           // Create a formatted string of JSON data
//           const formattedData = JSON.stringify(item, null, 2);
//           itemContainer.innerHTML = `<h3 class="font-bold">Data Received ${
//             index + 1
//           }</h3><pre>${formattedData}</pre>`;
//           responseContainer.appendChild(itemContainer);
//         });
//       } else {
//         responseContainer.innerHTML = "<p>No data available.</p>";
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       document.getElementById("response").innerText = "Error: " + error;
//     });
// }

// function sendPostRequest() {
//   fetch("/test-web-service", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ data: "Sample POST Data" }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       document.getElementById("response").innerText =
//         "Response: " + JSON.stringify(data, null, 2);
//     })
//     .catch((error) => console.error("Error:", error));
// }
