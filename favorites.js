const favoritesList = document.getElementById("favoritesList");
const favCount = document.getElementById("favCount");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favCount) favCount.textContent = favorites.length;

function render() {
    if (!favoritesList) return;

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p>Нет избранных товаров</p>";
        return;
    }

    favorites.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.img}">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
        `;

        favoritesList.appendChild(card);
    });
}

render();

function goHome() {
    window.location.href = "index.html";
}