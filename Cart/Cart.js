document.addEventListener("DOMContentLoaded", () => {
  const cartTable = document.querySelector(".cart-table tbody");
  const totalPriceEl = document.querySelector(
    ".summary-item:nth-child(1) span:last-child"
  );
  const totalPaymentEl = document.querySelector(
    ".summary-item.total span.highlight"
  );

  const DELIVERY_FEE = 2500;

  function updateSummary() {
    const rows = cartTable.querySelectorAll("tr");
    let total = 0;

    rows.forEach((row) => {
      const priceEl = row.querySelector("td:nth-child(5) strong");
      const quantity = parseInt(
        row.querySelector(".quantity-control span").textContent
      );
      const price = parseInt(priceEl.textContent.replace(/[^0-9]/g, ""));

      total += price * quantity;
    });

    totalPriceEl.textContent = `${total.toLocaleString()}원`;
    const payment = total < 20000 ? total + DELIVERY_FEE : total;
    totalPaymentEl.textContent = `${payment.toLocaleString()}원`;
  }

  // 수량 증가/감소
  cartTable.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      const quantitySpan = button.parentElement.querySelector("span");
      let quantity = parseInt(quantitySpan.textContent);

      if (button.textContent === "+" && quantity < 99) {
        quantity++;
      } else if (button.textContent === "-" && quantity > 1) {
        quantity--;
      }

      quantitySpan.textContent = quantity;
      updateSummary();
    }
  });

  // 삭제하기 버튼
  cartTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      e.target.closest("tr").remove();
      updateSummary();
    }
  });

  // 선택 상품 삭제
  document
    .querySelector(".cart-actions button:nth-child(2)")
    .addEventListener("click", () => {
      const checkedRows = cartTable.querySelectorAll(
        "tr input[type='checkbox']:checked"
      );
      checkedRows.forEach((input) => input.closest("tr").remove());
      updateSummary();
    });

  // 장바구니 비우기
  document
    .querySelector(".cart-actions button:nth-child(3)")
    .addEventListener("click", () => {
      cartTable.innerHTML = "";
      updateSummary();
    });

  updateSummary(); // 초기 계산
});
