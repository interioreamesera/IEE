// Shopping Cart Data Structure
let shoppingCart = [];

// Product constructor for the shopping cart
class Product {
    constructor(id, name, price, quantity = 1) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

// Sample Products (you can dynamically load this data or use from a backend)
const products = [
    new Product(1, 'Modern Sofa', 30000),
    new Product(2, 'Living Room Set', 45000),
    new Product(3, 'Dining Table', 25000),
    new Product(4, 'Classic Chair', 7000)
];

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartProduct = shoppingCart.find(p => p.id === productId);

    if (cartProduct) {
        // If the product is already in the cart, increment its quantity
        cartProduct.quantity++;
    } else {
        // Otherwise, add a new product to the cart
        shoppingCart.push({...product});
    }

    updateCart();
}

// Function to update the shopping cart display
function updateCart() {
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartTotalContainer = document.querySelector('#cart-total');

    // Clear the cart display before updating
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    // Display the items in the shopping cart
    shoppingCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${item.name} (x${item.quantity}) - ₹${itemTotal.toLocaleString()}`;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update the total price
    cartTotalContainer.innerHTML = `Total: ₹${totalPrice.toLocaleString()}`;
}

// Checkout functionality
function checkout() {
    if (shoppingCart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const confirmation = confirm('Do you want to proceed to checkout?');
    if (confirmation) {
        // Simulate order confirmation and reset the cart
        alert('Thank you for your purchase! Your order has been confirmed.');
        shoppingCart = [];
        updateCart();
    }
}

// Contact form validation
function validateContactForm(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (!name || !email || !message) {
        alert('All fields are required!');
        return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert('Thank you for reaching out! We will get back to you soon.');
    document.querySelector('#contact-form').reset();
}

// Initialize event listeners
function init() {
    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            addToCart(productId);
        });
    });

    // Checkout button
    document.querySelector('#checkout-btn').addEventListener('click', checkout);

    // Contact form submission
    document.querySelector('#contact-form').addEventListener('submit', validateContactForm);
}

// Call the init function when the page loads
document.addEventListener('DOMContentLoaded', init);
