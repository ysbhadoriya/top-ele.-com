import products from "./api/products.js"
import fetchQuantityFromCartLS from "./fetchQuantityFromCardLS.js";
import getCartProductFromLS from "./getCardPro.js"
import incrementDecrement from "./incrementDecrement.js";
import removeProdFromCart from "./removeProdFromCart.js";
import updateCartProductTotal from "./updateCartProductTotal.js";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd ) => {
    return cartProducts.some((curElem) => curElem.id ===  curProd.id)
        //  console.log(curProd.name);    
});

console.log(filterProducts);


// --------------------------------------------------------------------------------

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
  // Ensure filterProducts is defined and not empty
//   if (!filterProducts || filterProducts.length === 0) {
//     console.error("No products found in filterProducts");
//     return;
//   }

  filterProducts.forEach((curProd) => {
    const { category, id, image, name, stock, price } = curProd;

    // Clone the template content
    let productClone = document.importNode(templateContainer.content, true);

    const isActualData = fetchQuantityFromCartLS( id , price )
    // console.log(isActualData);
    


    // Populate the clone with product data`
    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`)
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image; // Assuming it's an image
    productClone.querySelector(".productPrice").textContent = `₹ ${isActualData.price}`;
   productClone.querySelector(".productQuantity").textContent = isActualData.quantity ;
  

 productClone.querySelector(".remove-to-cart-button").addEventListener('click' , () => removeProdFromCart(id))

 productClone.querySelector(".stockElement")
 .addEventListener("click" , (event) => {
    incrementDecrement(event , id , stock , price) ;
 })



    // Append the clone to the cart element
    cartElement.append(productClone);
  });
};

// Call the function to actually show products
showCartProduct();

updateCartProductTotal() ;