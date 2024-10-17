export const cart = [];

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
            })
        }
        console.log(cart);
}