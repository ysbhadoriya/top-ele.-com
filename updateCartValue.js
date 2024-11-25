

const cartValue = document.getElementById("cartValue")


const updateCartValue = (cartProduct) => {
    console.log(cartProduct);
    
return  cartValue.innerHTML = ` <i class="fa-solid fa-cart-shopping"> 
${cartProduct.length} </i>`
}

export default updateCartValue 