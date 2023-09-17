//Media Queries
const navbar = document.getElementById("navMobile");
const slidePhoto = document.querySelector(".slide");
const navButtons = document.querySelector(".navButtons");

function myFunction(x) {
  if (x.matches) {
    navbar.style.right = "-100vw";
    setTimeout(() => {
      slidePhoto.style.left = "0px";
    }, 2600);
  } else {
    setTimeout(() => {
      slidePhoto.style.left = "150px";
    }, 2600);
  }
}

var x = window.matchMedia("(max-width: 700px)");
myFunction(x);
x.addListener(myFunction);

// navbar section

const navbarToggle = document.querySelector(".menuBurger");
const closeToggle = document.querySelector(".closeMenu");

navbarToggle.addEventListener("click", () => {
  navbar.style.right = "0px";
});
closeToggle.addEventListener("click", () => {
  navbar.style.right = "-100vw";
});

// intro section

let intro = document.querySelector(".intro");
let logo = document.querySelector(".logoIntro");
let logoSpan = document.querySelectorAll(".welcomeLogo");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    logoSpan.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("active");
      }, (index + 1) * 400);
    });

    setTimeout(() => {
      logoSpan.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove("active");
          item.classList.add("fade");
        }, (index + 1) * 50);
      });
    }, 2000);

    setTimeout(() => {
      intro.style.top = "-100vh";
    }, 2300);
  });
});

// item section classes

function Item(id, name, desc, price, photoBig, photoSmall) {
  this.id = id;
  this.name = name;
  this.desc = desc;
  this.price = price;
  this.photoBig = photoBig;
  this.photoSmall = photoSmall;
}

const items = [
  new Item(
    1,
    "Caramel Flavored Coffee",
    "Starbucks® by Nespresso® Original Line",
    "30.00",
    "Caramel.webp",
    "Caramel_Capsule.webp"
  ),
  new Item(
    2,
    "Vanilla Flavored Coffee",
    "Starbucks® by Nespresso® Original Line",
    "50.00",
    "Vanilla.webp",
    "Vanilla_Capsule.webp"
  ),
  new Item(
    3,
    "Pike Place Roast",
    "Starbucks® by Nespresso® Original Line",
    "20.00",
    "NespOriginal.webp",
    "NespOriginal_Capsule.webp"
  ),
];

function itemsGallery() {
  const itemsContainer = document.querySelector(".items");

  let itemHTML = "";

  items.forEach((item) => {
    itemHTML += `
        <div class="item">
        <img src="img/${item.photoBig}" class="mainItemPhoto" width="350" alt="${item.name}"/>
        <img src="img/${item.photoSmall}" width="200" alt="${item.name}" />
        
        <h2 class="item-name">${item.name}</h2>
        <p class="item-desc">${item.desc}</p>
        <p class="item-price">${item.price}$</p>
        
        <div class="cart-action">
        <input
        type="number"
        name = "quantity"
        class="item-quantity"
        aria-label="quantity"
        value="1"
        min="1"
        size="2"
        />
        <button class="add-to-cart itemBtn" onclick="addToCart(this)" >Add Item</button>
        <button class="itemBtn">More Details</button>
        </div>
        <input type="hidden"  class="item-id" value="${item.id}" />
          </div>
        `;
  });

  itemsContainer.innerHTML = itemHTML;
}

////////// cart functions

//add to cart

function addToCart(element) {
  const itemParent = element.closest(".item");
  const id = itemParent.querySelector(".item-id").value;
  const name = itemParent.querySelector(".item-name").innerText;
  const price = itemParent.querySelector(".item-price").innerText;
  const quantity = itemParent.querySelector(".item-quantity").value;
  const desc = itemParent.querySelector(".item-desc").innerText;
  const photo = itemParent.querySelector(".mainItemPhoto").src;

  const cartItem = {
    id,
    name,
    price,
    quantity,
    desc,
    photo,
  };
  let cartArray = new Array();

  if (sessionStorage.getItem("shopping-cart")) {
    cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));

    const index = cartArray.findIndex((item) => item.id == id);

    if (index != -1) {
      cartArray[index].quantity = Number(cartArray[index].quantity) + Number(quantity);
    } else {
      cartArray.push(cartItem);
    }
  } else {
    cartArray.push(cartItem);
  }

  sessionStorage.setItem("shopping-cart", JSON.stringify(cartArray));
  showCartItem();
}

//show item on cart

function showCartItem() {
  let cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
  const cartItems = document.querySelector(".cart-items");

  if ((cartArray = JSON.parse(sessionStorage.getItem("shopping-cart")))) {
    cartItems.innerHTML = `
  <button id="checkout-btn" class="checkoutBtn" type="submit">
  CHECKOUT
  </button>
  <h3 class="total-price">Total Price: <span class="price"></span></h3>
  <h3 class="total-items-cart">Total Items: <span class="total"></span></h3>
  <div class="decoration-line"></div>
  `;
  } else {
    cartItems.innerHTML = `
    <button id="startShoppingBtn" class="checkoutBtn" type="submit">
    Start Shopping
  </button>
  <p class="empty">Your cart is empty.</p>
  `;
  }

  let itemCount = 0;
  let totalPrice = 0;

  cartArray.forEach((item) => {
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity);
    const subTotal = price * quantity;

    itemCount += quantity;
    totalPrice += subTotal;

    let itemSelect = `
        <div class="item-list">
        <img
          src="${item.photo}"
          class="item-photo"
          alt="photo item"
        />
        <div class="item-details">
          <h3 class="item-name">${item.name}</h3>
          <p class="item-desc">${item.desc}</p>
        </div>
        <p class="item-quantity">${item.quantity} Items</p>
        <h3 class="item-price">${subTotal}$</h3>
        <p class="item-remove" onclick="removeItem(this)">Remove</p>
        <input type="hidden"  class="item-id" value="${item.id}" />
      </div>
        `;

    cartItems.innerHTML += itemSelect;
  });

  document.querySelector(".total").innerText = itemCount;
  document.querySelector(".price").innerText = totalPrice + "$";
}

itemsGallery();
emptyCart();

function emptyCart() {
  const cartItems = document.querySelector(".cart-items");
  cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
  if (cartArray != null) {
    showCartItem();
  } else {
    cartItems.innerHTML = `
    <button id="startShoppingBtn" class="checkoutBtn" type="submit">
    Start Shopping
  </button>
  <p class="empty">Your cart is empty.</p>
  `;
  }
}

function removeItem(element) {
  const itemParent = element.closest(".item-list");
  const id = itemParent.querySelector(".item-id").value;
  cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));

  if ((cartArray = JSON.parse(sessionStorage.getItem("shopping-cart")))) {
    let index = cartArray.findIndex((item) => item.id == id);
    cartArray.shift(index);
    sessionStorage.setItem("shopping-cart", JSON.stringify(cartArray));
  }
  if (cartArray.length == 0) {
    sessionStorage.removeItem("shopping-cart");
  }
  emptyCart();
}
