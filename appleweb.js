document.addEventListener("DOMContentLoaded", () => {
    // Функция обновления счетчиков в шапке
    function updateHeader() {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const favs = JSON.parse(localStorage.getItem("favorites") || "[]");

        const cartCount = document.getElementById("cartCount");
        const favCount = document.getElementById("favCount");

        if (cartCount) cartCount.textContent = cart.length;
        if (favCount) favCount.textContent = favs.length;
    }

    updateHeader();

    // Логика Купить
    document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const card = btn.closest(".card");
            const item = {
                name: card.querySelector("h3").textContent,
                price: parseInt(card.querySelector(".new-price").textContent.replace(/\D/g, "")),
                img: card.querySelector("img").src // Берем полный путь к картинке
            };

            let cart = JSON.parse(localStorage.getItem("cart") || "[]");
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateHeader();

            // Анимация кнопки
            const originalText = btn.textContent;
            btn.textContent = "В корзине!";
            btn.style.background = "#2ecc71";
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = "";
            }, 800);
        };
    });

    // Логика Избранного (Исправлено: теперь сохраняет картинку и цену)
    document.querySelectorAll(".fav-btn").forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const card = btn.closest(".card");

            // Собираем данные товара полностью
            const item = {
                name: card.querySelector("h3").textContent,
                // Сохраняем цену как строку с символом ₸, чтобы не было undefined
                price: card.querySelector(".new-price").textContent,
                img: card.querySelector("img").src
            };

            let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
            const index = favs.findIndex(f => f.name === item.name);

            if (index === -1) {
                favs.push(item);
                btn.classList.add("active");
            } else {
                favs.splice(index, 1);
                btn.classList.remove("active");
            }

            localStorage.setItem("favorites", JSON.stringify(favs));
            updateHeader();
        };
    });
});