export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart) {
    cart = [{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptions: '1'
    },{
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptions: '1'
    }]

}

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
                quantity: 1,
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