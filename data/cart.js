
export let cart = JSON.parse(localStorage.getItem('cart'));

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingitem;
   
        cart.forEach((item) => {
            if(productId === item.id) {
                matchingitem = item;
            }
        });

        if (matchingitem) {
            matchingitem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                quantity: 1
            });
        }
        saveToStorage();
}

export function removeFromCart(productId) {
    let updatedCart = [];
    cart.forEach((cartitem) => {
        if(productId !== cartitem.id){
            updatedCart.push(cartitem);
        }
    });
    cart = updatedCart;
    saveToStorage();
}