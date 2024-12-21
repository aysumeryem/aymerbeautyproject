// Header
const menuButton = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {
    if (navMenu.style.display === "block") {
        navMenu.style.display = "none";
    } else {
        navMenu.style.display = "block";
    }
});

// Products

let allProducts = [];
let currentPage = 1;
const productsPerPage = 16;
let card;

// API dan data cekmek

const fetchProducts = async () => {
  try {
    const response = await fetch(
      "http://makeup-api.herokuapp.com/api/v1/products.json"
    );
    const data = await response.json();
    console.log(data);

    allProducts = data.slice(50);
    renderProducts();
    renderPagination();
  } catch (error) {
    console.error("Error at fetch process", error);
  }
};

// productslari siralamaq

const renderProducts = () => {
  const productsContainer = document.getElementById("product-container");
  productsContainer.innerHTML = "";

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToRender = allProducts.slice(start, end);

  productsToRender.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
    <img src="${product.image_link}" alt="${product.name}" 
         onerror="this.src='https://via.placeholder.com/200';">
    <h2>${product.name}</h2>
    <div>
          <p><strong>Marka:</strong> ${product.brand || "Unknown"}</p>
          <p><strong>Qiymət:</strong> ${product.price_sign || "$"}${
      product.price || "N/A"
    }</p>
    </div>
  `;
    productsContainer.appendChild(card);
  });
};

// pagination

const renderPagination = () => {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(currentPage + 2, totalPages);

  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "<";
    prevButton.onclick = () => {
      currentPage--;
      renderProducts();
      renderPagination();
    };
    paginationContainer.appendChild(prevButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.style.fontWeight = "bold";
    }
    pageButton.onclick = () => {
      currentPage = i;
      renderProducts();
      renderPagination();
    };
    paginationContainer.appendChild(pageButton);
  }

  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.textContent = ">";
    nextButton.onclick = () => {
      currentPage++;
      renderProducts();
      renderPagination();
    };
    paginationContainer.appendChild(nextButton);
  }
};

// Axtaris
const searchProducts = () => {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  allProducts = allProducts.filter(
    (product) =>
      product.name && product.name.toLowerCase().includes(searchInput)
  );
  currentPage = 1;
  renderProducts();
  renderPagination();
};

fetchProducts();


// Modal

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("modal");

openModal.addEventListener("click", function () {
  modal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});