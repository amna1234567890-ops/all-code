    const cart = [];

    // Function to add product to the cart
    function addToCart(id, name, price) {
        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCart();
    }

    // Function to update cart details
    function updateCart() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        // Update cart count
        cartCount.textContent = cart.reduce((total, product) => total + product.quantity, 0);

        // Clear and update cart items
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(product => {
            total += product.price * product.quantity;
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price} x ${product.quantity}`;
            cartItems.appendChild(li);
        });

        // Update cart total
        cartTotal.textContent = total.toFixed(2);
    }

    // Modal functionality
    const modal = document.getElementById('cart-modal');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Open the modal when clicking on the cart
    document.querySelector('.cart').onclick = function() {
        modal.style.display = 'block';
    }

    // Close the modal when clicking on the close button
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Close the modal when clicking outside of the modal content
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Form validation
    function validateForm() {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;   
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;   
        var options = document.getElementById("options").value;

        var errors = [];

        // Clear previous error list
        var existingErrorList = document.getElementById("error-list");
        if (existingErrorList) {
            existingErrorList.remove(); // Clear previous errors
        }

        if (name === "") {
            errors.push("Please enter your name.");
        }

        if (email === "") {
            errors.push("Please enter your email address.");
        }

        if (password === "") {
            errors.push("Please enter a password.");
        }

        if (password !== "" && confirmPassword !== password) {
            errors.push("Passwords do not match.");
        }

        if (options === "") {
            errors.push("Please select an option.");
        }

        if (errors.length > 0) {
            var errorList = document.createElement("ul");
            errorList.id = "error-list"; // Assign an ID to error list for future reference
            for (var i = 0; i < errors.length; i++) {
                var errorItem = document.createElement("li");
                errorItem.className = "error";
                errorItem.textContent = errors[i];
                errorList.appendChild(errorItem);
            }
            document.body.appendChild(errorList); // You might want to append it to a specific container
            return false;
        } else {
            // Submit the form (e.g., send data to a server)
            alert("Form submitted successfully!");
            return true;
        }
    }

    // Products list
    const products = [
        { name: 'Product 1', price: 20 },
        { name: 'Product 2', price: 50 },
        { name: 'Product 3', price: 15 },
    ];

    // Function to display products
    function displayProducts(productArray) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear the list
        productArray.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h2>${product.name}</h2>
                <p class="price">$${product.price}</p>
            `;
            productList.appendChild(productDiv);
        });
    }

    // Sort products by price
    document.getElementById('sortPrice').addEventListener('click', () => {
        const sortedProducts = [...products].sort((a, b) => a.price - b.price);
        displayProducts(sortedProducts);
    });

    // Add a new product dynamically
    document.getElementById('addProduct').addEventListener('click', () => {
        const newProductName = prompt('Enter the product name:');
        const newProductPrice = parseFloat(prompt('Enter the product price:'));
        if (newProductName && !isNaN(newProductPrice)) {
            products.push({ name: newProductName, price: newProductPrice });
            displayProducts(products);
        }
    });

    // Display the initial products
    window.onload = function () {
        displayProducts(products);
    }

