if (window.location.href.includes("https://dineoncampus.com/northwestern")) {
        // Create and style the button
    const scrapeButton = document.createElement("button");
    scrapeButton.innerText = "Get Dishes";
    scrapeButton.style.position = "fixed";
    scrapeButton.style.bottom = "20px";
    scrapeButton.style.right = "20px";
    scrapeButton.style.padding = "10px 15px";
    scrapeButton.style.backgroundColor = "#007bff";
    scrapeButton.style.color = "white";
    scrapeButton.style.border = "none";
    scrapeButton.style.borderRadius = "5px";
    scrapeButton.style.cursor = "pointer";
    scrapeButton.style.zIndex = "1000"; 

    // Add button to the webpage
    document.body.appendChild(scrapeButton);

    // Handle button click to find and display dish links
    scrapeButton.addEventListener("click", () => {
    let dishes = [];

    // Select the dish elements from the page
    const menuItems = document.querySelectorAll(".menu-tile-item .col-9 span");

    menuItems.forEach(item => {
        let dishName = item.textContent.trim();
        let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(dishName)}`;
        dishes.push({ name: dishName, url: searchUrl });
    });

    if (dishes.length > 0) {
        // Display the dishes with links
        displayDishes(dishes);
    } else {
        alert("No dishes found.");
    }
    });

    // Function to display the list of dishes with links
    function displayDishes(dishes) {
    // Create a container for the dishes
    const dishContainer = document.createElement("div");
    dishContainer.style.position = "fixed";
    dishContainer.style.bottom = "70px";
    dishContainer.style.right = "20px";
    dishContainer.style.width = "200px";
    dishContainer.style.maxHeight = "300px";
    dishContainer.style.overflowY = "auto";
    dishContainer.style.backgroundColor = "white";
    dishContainer.style.border = "1px solid #ddd";
    dishContainer.style.borderRadius = "5px";
    dishContainer.style.padding = "10px";
    dishContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    dishContainer.style.zIndex = "1000";

    // Add each dish as a link in the container
    dishes.forEach(dish => {
        const dishDiv = document.createElement("div");
        dishDiv.style.display = "flex";
        dishDiv.style.justifyContent = "space-between";
        dishDiv.style.alignItems = "center";
        dishDiv.style.marginBottom = "8px";

        const dishName = document.createElement("span");
        dishName.innerText = dish.name;
        dishName.style.flexGrow = "1";
        dishName.style.marginRight = "10px";
        dishName.style.overflow = "hidden";
        dishName.style.whiteSpace = "nowrap";
        dishName.style.textOverflow = "ellipsis";

        const button = document.createElement("button");
        button.innerText = "Go";
        button.style.width = "40px";
        button.style.height = "25px";
        button.style.backgroundColor = "#007bff";
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.style.flexShrink = "0";
        button.addEventListener("click", () => {
            window.open(dish.url, "_blank");
        });

        dishDiv.appendChild(dishName);
        dishDiv.appendChild(button);
        dishContainer.appendChild(dishDiv);
    });

    // Append the container to the document body
    document.body.appendChild(dishContainer);
    }
}