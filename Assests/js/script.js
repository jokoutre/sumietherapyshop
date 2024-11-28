// JavaScript Document
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items
function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  let total = 0;

  // Clear the current cart display
  cartItemsContainer.innerHTML = '';

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    // Add cart item with image and detailed structure
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h5>${item.name}</h5>
          <p>Price: UGX ${item.price.toLocaleString()}</p>
          <p>
            Quantity: 
            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
            ${item.quantity}
            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
          </p>
        </div>
        <div class="cart-item-actions">
          <p>Subtotal: UGX ${subtotal.toLocaleString()}</p>
          <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  // Update the cart total
  cartTotalElement.textContent = total.toLocaleString();
}

// Function to update the quantity of an item
function updateQuantity(index, quantity) {
  if (quantity <= 0) {
    removeItem(index); // Remove item if quantity is zero or less
    return;
  }
  cart[index].quantity = quantity;
  localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
  displayCart(); // Refresh the cart display
}

// Function to remove an item from the cart
function removeItem(index) {
  cart.splice(index, 1); // Remove item from cart array
  localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
  displayCart(); // Refresh the cart display
}

// Function to add items to the cart
function addToCart(productName, price, image) {
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, image: image, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} added to cart!`);

  // Update cart count whenever an item is added
  updateCartCount();
}

// Function to update the cart count in the cart icon
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

// Call displayCart on page load (if applicable)
if (document.getElementById('cart-items')) {
  displayCart();
}

// Call updateCartCount on page load
updateCartCount();
