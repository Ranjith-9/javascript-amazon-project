import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
    
    let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    
    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML = `
        <div class = "js-cart-section"></div>
        <div class = "js-payment-summary"></div>
        `;
        spyOn(localStorage,'setItem');
       
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptions: '2'
            },{
                id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptions: '3'
            }]);
        });
       
        loadFromStorage();
        renderOrderSummary();  
    });
    
    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = ''
    })

    it('displays the cart', () => {
        expect(
            document.querySelectorAll('.js-item-container').length
        ).toEqual(2);
       
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).not.toEqual(null)
    });

    it ('removes items from cart',() => {
 
        document.querySelector('.js-delete-link').click();

        expect(
            document.querySelectorAll('.js-item-container').length
        ).toEqual(1);
    })
});