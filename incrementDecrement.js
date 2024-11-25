import getCartProductFromLS from "./getCardPro.js";
import updateCartProductTotal from "./updateCartProductTotal.js";

const incrementDecrement = (event, id, stock, price) => {
  const currentCardElement = document.querySelector(`#card${id}`);
  const productQuantity = currentCardElement.getElementsByClassName("productQuantity")[0];
  const productPrice = currentCardElement.querySelector(".productPrice");

  let quantity = 1;
  let localStoragePrice = price;

  // Fetch existing cart from local storage
  let localCartProducts = getCartProductFromLS();

  // Find the existing product in the cart
  let existingProd = localCartProducts.find((curProd) => curProd.id === id);

  // If product already exists in the cart, update quantity and price
  if (existingProd) {
    quantity = existingProd.quantity;
    localStoragePrice = existingProd.price / existingProd.quantity; 
    // Base price per unit
  }

  // Handle increment and decrement actions
  if (event.target.className === "cartIncrement") {
    if (quantity < stock) {
      quantity += 1;
    } else if (quantity === stock) {
      quantity = stock;
    }
  }

  if (event.target.className === "cartDecrement") {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  // Calculate updated price based on quantity
  localStoragePrice = price * quantity;

  // Update the DOM to reflect the new quantity and price
  productQuantity.textContent = quantity;
  productPrice.textContent = `₹${localStoragePrice.toFixed(2)}`;

  // Update the product details in local storage
  let updatedCart = localCartProducts.map((curProd) => {
    return curProd.id === id ? { ...curProd, quantity, price: localStoragePrice } : curProd;
  });

  // Save the updated cart back to local storage
  localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));
  
  updateCartProductTotal();   
};

export default incrementDecrement;
