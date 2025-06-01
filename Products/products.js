// 제품 개수 표시
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");
  const countDisplay = document.querySelector(".product-count");
  countDisplay.textContent = `총 ${productCards.length}개의 제품`;
});

// 가격 텍스트를 숫자로 변환
function extractPrice(text) {
  return parseInt(text.replace(/[^0-9]/g, ""), 10) || 0;
}

// 정렬 함수: .price 기준으로 정렬 (세일가 기준)
function sortProducts(order = "asc") {
  const container = document.querySelector(".product-list");
  const cards = Array.from(container.querySelectorAll(".product-card"));

  const sortedCards = cards.sort((a, b) => {
    const priceA = extractPrice(a.querySelector(".price")?.textContent || "");
    const priceB = extractPrice(b.querySelector(".price")?.textContent || "");
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });

  // 기존 카드 제거 후 재배치
  container.innerHTML = "";
  sortedCards.forEach((card) => container.appendChild(card));
}

// active 클래스 처리
function setActiveSort(target) {
  const allSorts = document.querySelectorAll(".sort-options a");
  allSorts.forEach((el) => el.classList.remove("active"));
  target.classList.add("active");
}

// 정렬 버튼 이벤트 연결
document.addEventListener("DOMContentLoaded", () => {
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

  // 판매량순, 리뷰순은 기능 없이 active만 처리
  document.querySelector(".sort-default").addEventListener("click", (e) => {
    e.preventDefault();
    setActiveSort(e.target);
  });

  document.querySelector(".sort-review").addEventListener("click", (e) => {
    e.preventDefault();
    setActiveSort(e.target);
  });
});
