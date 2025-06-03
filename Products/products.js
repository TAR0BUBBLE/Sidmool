document.addEventListener("DOMContentLoaded", () => {
  // 제품 개수 표시
  const productCards = document.querySelectorAll(".product-card");
  const countDisplay = document.querySelector(".product-count");
  countDisplay.textContent = `총 ${productCards.length}개의 제품`;

  // 정렬 버튼 이벤트 연결
  document.querySelector(".sort-low-price").addEventListener("click", (e) => {
    e.preventDefault();
    sortProducts("asc");
    setActiveSort(e.target);
  });

  document.querySelector(".sort-high-price").addEventListener("click", (e) => {
    e.preventDefault();
    sortProducts("desc");
    setActiveSort(e.target);
  });

  // 기타 정렬 버튼 (기능 없이 active 처리)
  document.querySelector(".sort-default").addEventListener("click", (e) => {
    e.preventDefault();
    setActiveSort(e.target);
  });

  document.querySelector(".sort-review").addEventListener("click", (e) => {
    e.preventDefault();
    setActiveSort(e.target);
  });
});

function extractPrice(text) {
  return parseInt(text.replace(/[^0-9]/g, ""), 10) || 0;
}

function sortProducts(order = "asc") {
  const container = document.querySelector(".product-list");
  const cards = Array.from(container.querySelectorAll(".product-card"));

  const sortedCards = cards.sort((a, b) => {
    const priceA = extractPrice(
      a.querySelector(".price-amount")?.textContent || ""
    );
    const priceB = extractPrice(
      b.querySelector(".price-amount")?.textContent || ""
    );
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });

  container.innerHTML = "";
  sortedCards.forEach((card) => container.appendChild(card));
}

function setActiveSort(target) {
  const allSorts = document.querySelectorAll(".sort-options a");
  allSorts.forEach((el) => el.classList.remove("active"));
  target.classList.add("active");
}
