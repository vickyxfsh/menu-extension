
let scrapeMenu = document.getElementById('scanPage');
let list = document.getElementById('dishesList');

// handler to received dishes from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let dishes = request.dishes;
  
  // display dishes on popup
  if (dishes == null || dishes.length == 0){
    // no dishes
    let li = document.createElement("li");
    li.innerText = "no dishes found";
    list.appendChild(li);
  } else {
    dishes.forEach((dish) => {
      let li = document.createElement("li");
      li.innerText = dish;
      list.appendChild(li);
    })
  }
})

// botton's click event listener
scrapeMenu.addEventListener("click", async () => {

  // get current active tabs
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  
  // Check if we are on a supported page
  if (tab && tab.url.startsWith("http")){
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: scrapeMenuFromPage,
    });
  } else {
    console.error("Can't parse on this page");
  }
});

// parse menu from the page to get dishes' names
function scrapeMenuFromPage() {
  let dishes = [];
  
  // specific class title to parse dishes from html code
  const menuItems = document.querySelectorAll(".menu-tile-item .col-9 span");

  menuItems.forEach(item => {
    let dishName = item.textContent.trim();
    dishes.push(dishName);
  })

  chrome.runtime.sendMessage({dishes});
}