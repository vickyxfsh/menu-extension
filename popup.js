let scrapeMenu = document.getElementById('scanPage');
let list = document.getElementById('dishesList');

// Handler to receive dishes from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let dishes = request.dishes;
  
  // Clear previous dishes, if any
  list.innerHTML = "";

  // Display dishes on popup
  if (!dishes || dishes.length === 0) {
    let noDishes = document.createElement("div");
    noDishes.innerText = "No dishes found";
    list.appendChild(noDishes);
  } else {
    dishes.forEach((dishUrl) => {
      // Create a container div for each dish
      let dishDiv = document.createElement("div");
      dishDiv.classList.add("dish-item");

      // Dish name on the left
      let dishName = document.createElement("span");
      dishName.innerText = decodeURIComponent(dishUrl.split('=')[1]);
      dishDiv.appendChild(dishName);

      // Button on the right
      let button = document.createElement("button");
      button.innerText = "Go";
      button.classList.add("dish-button");

      // Add click event to button
      button.addEventListener("click", () => {
        chrome.tabs.create({ url: dishUrl }); // Open link in a new tab
      });
      dishDiv.appendChild(button);

      // Add dish div to the list
      list.appendChild(dishDiv);
    });
  }
});

// Button's click event listener
scrapeMenu.addEventListener("click", async () => {
  // Get current active tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Check if we are on a supported page
  if (tab && tab.url.startsWith("http")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeMenuFromPage,
    });
  } else {
    console.error("Can't parse on this page");
  }
});

// Parse menu from the page to get dishes' names
function scrapeMenuFromPage() {
  let dishes = [];
  
  // Specific class title to parse dishes from HTML
  const menuItems = document.querySelectorAll(".menu-tile-item .col-9 span");

  menuItems.forEach(item => {
    let dishName = item.textContent.trim();
    let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(dishName)}`;
    dishes.push(searchUrl);
  });

  chrome.runtime.sendMessage({ dishes });
}
