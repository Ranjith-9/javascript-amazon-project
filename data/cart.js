export let cart; 
loadFromStorage();

export function loadFromStorage() {
   cart = JSON.parse(localStorage.getItem('cart'));
   if(!cart) {
        cart = [{
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptions: '2'
        },{
            id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptions: '3'
        }]
    } 
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingitem;
    const quantitySelector = document.querySelector(`.js-quatity-selector-${productId}`);
    const productQuant = quantitySelector ? Number(quantitySelector.value) : 1; 
        cart.forEach((item) => {
            if(item.id === productId) {
                matchingitem = item;
            }
        });

        if (matchingitem) {
            matchingitem.quantity += productQuant;
        } else {
            cart.push({
                id: productId,
                quantity: productQuant,
                deliveryOptions: '1'
            });
        }
        saveToStorage();
}

export function removeFromCart(productId) {
    const updatedCart = [];
    cart.forEach((cartitem) => {
        if(productId !== cartitem.id){
            updatedCart.push(cartitem);
        }
    });
    cart = updatedCart;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingitem;
   
        cart.forEach((item) => {
            if(productId === item.id) {
                matchingitem = item;
            }
        });
        matchingitem.deliveryOptions = deliveryOptionId;
        saveToStorage();
}


export function updateCartQuantityCheckOut() {
    let cartQuant = 0;
    cart.forEach((cartItem) => {
        cartQuant += cartItem.quantity;
    })
    saveToStorage();
    document.querySelector('.js-cart-count').innerHTML = `${cartQuant}`;
   
}

export function updateCart (productId, updatedQuant) {
    let matchingitem;
    cart.forEach((cartItem) => {
        if(cartItem.id === productId) {
            matchingitem = cartItem
        }  
    })
    matchingitem.quantity = updatedQuant
    saveToStorage();
}