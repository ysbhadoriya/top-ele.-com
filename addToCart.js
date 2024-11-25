import getCartProductFromLS from "./getCardPro.js";
import showToast from "./showToast.js";
import updateCartValue from "./updateCartValue.js";

getCartProductFromLS()

const addToCart = (event , id , stock ) => {

    let arrLocalStorageProduct = getCartProductFromLS()
    const currentProdElem = document.querySelector(`#card${id}`)
    // console.log(currentProdElem);
    let quantity = currentProdElem.querySelector(".productQuantity").innerText ; 
    let price = currentProdElem.querySelector(".productPrice").innerText ;

price = price.replace("₹" , "");
let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id )

if (existingProd && quantity > 1) {
    quantity = Number(existingProd.quantity) + Number(quantity);
    price = Number(price * quantity);
    let updatedCart = { id, quantity, price };

    updatedCart = arrLocalStorageProduct.map((curProd) => {
      return curProd.id === id ? updatedCart : curProd;
    });
    // console.log(updatedCart);

    localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

    
}





if (existingProd) {
    alert("This product is already existing");
    return false ;
}

price = Number(price * quantity) ;
quantity = Number(quantity)
// console.log(quantity , price );


let updateCart = {id , quantity , price };
arrLocalStorageProduct.push(updateCart);

localStorage.setItem("cartProductLS" , JSON.stringify(arrLocalStorageProduct));

updateCartValue(arrLocalStorageProduct)

showToast("add" , id )
    
}

export default addToCart ;