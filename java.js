let cart= [];
let cartCount=0;
let cartTotal=0;

const cartCountElement=document.getElementById('cart-count');
const cartItemsElement=document.getElementById('cart-items');
const cartTotalElement=document.getElementById('cart-total');
const checkoutBtn=document.getElementById('checkout-btn');

function updateCartCount(){
    cartCountElement.textContent=cartCount
    
}

function renderCart(){
    cartItemsElement.innerHTML= '';
    cart.forEach(item =>{
        const li=document.createElement('li');
        li.className='list-group-item';
        li.textContent=`${item.name} - $${item.price.toFixed(2)}`;
        cartItemsElement.appendChild(li);
    });
    cartTotalElement.textContent=cartTotal.toFixed(2);
}
function addToCart(name,price){
    cart.push({
        name,price    
    });
    cartCount++;
    cartTotal += price;
    updateCartCount();
    renderCart();

}

// Función para eliminar un elemento del carrito
function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    cartCount--;
    cartTotal -= removedItem.price;
    updateCartCount();
    renderCart();
}

// Función para agregar un elemento al carrito desde el botón en la tarjeta
function addToCartFromButton(button) {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    addToCart(name, price);
}


// Agregar productos al carrito al hacer clic en el botón "Agregar al carrito"
document.querySelectorAll('.add-to-cart-btn').forEach((button, index) => {
    button.addEventListener('click', () => {
    addToCartFromButton(button);
    });
});

// Eliminar productos del carrito al hacer clic en el botón "Eliminar" en la lista del carrito
document.getElementById('cart-items').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart-btn')) {
    const index = event.target.getAttribute('data-index');
    removeFromCart(index);
    }
});

checkoutBtn.addEventListener('click', ()=>{
    alert('compra finalizada. Total: $' + cartTotal.toFixed(2));
    cart= [];
    cartCount=0;
    cartTotal=0;
    updateCartCount();
    renderCart();
});


