import {products, getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { cart,removeFromCart,updateDeliveryOption, updateCartQuantityCheckOut, updateCart } from "../../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  updateCartQuantityCheckOut();
    let carthtml ='';
    cart.forEach((cartItem) => {
    const cartId = cartItem.id;

    const matchingProduct = getProduct(cartId);
      
    const deliveryOptionsId = cartItem.deliveryOptions;

    let deliveryOption = getDeliveryOption(deliveryOptionsId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
      );
    const dateString = deliveryDate.format('dddd, MMMM D');

      carthtml += `<div class="cart-item-container 
          js-item-container
          js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-button" data-product-id = "${matchingProduct.id}">
                      Update
                    </span>
                    <input class = "quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class = "save-quantity-link link-primary js-save-link" data-product-id ="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id ="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>`;
  })


function deliveryOptionsHTML(matchingProduct,cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{ 
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents 
    === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptions;
    
    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id ="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  })
  return html;
  }



document.querySelector('.js-cart-section').innerHTML = carthtml;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
link.addEventListener('click',()=>{
  const productId = link.dataset.productId;
  removeFromCart(productId);
  renderPaymentSummary();
  updateCartQuantityCheckOut();
  document.querySelector(`.js-cart-item-container-${productId}`).remove();
  
})
})

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const {productId,deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
    
  });
});

document.querySelectorAll('.js-update-button').forEach((element) => {
  element.addEventListener('click', () => {
    const productId = element.dataset.productId;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add("is-editing-quantity")
  });
});

document.querySelectorAll('.js-save-link').forEach((element) => {
  element.addEventListener('click', () => {
    const productId = element.dataset.productId;
    const updatedQuant = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove("is-editing-quantity");
    updateCart(productId, updatedQuant);
    renderOrderSummary();
    renderPaymentSummary();
  });
});
}

