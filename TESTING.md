# MediShop Manual Testing Instructions

This document provides step-by-step instructions to manually test the key user flows in the MediShop ecommerce website.

---

## 1. Setup

- Open the `index.html` file in a modern web browser (preferably Chrome or Firefox).
- Ensure browser localStorage is enabled.
- If you have previously used the site, you may want to clear localStorage to start fresh:
  - In browser dev tools, go to Application tab → Local Storage → Clear all entries for the site.

---

## 2. User Registration

- On the initial login page, click the **Register** link below the login form.
- Fill in the fields:
  - Username: Choose a unique username.
  - Password: Enter a password.
  - Confirm Password: Must match the password.
  - Email: Enter a valid email address.
- Click **Register** button.
- Expected results:
  - If any field is empty, alert shows "All fields are required for registration."
  - If passwords do not match, alert shows "Passwords do not match!"
  - If username already exists, alert shows "Username already exists!"
  - On successful registration, alert shows "Registration successful! Please login."
  - The form switches back to login mode.

---

## 3. User Login

- On the login form, enter your registered username and password.
- Click the **Login** button.
- Expected results:
  - If any field is empty, alert shows "Username and Password are required for login."
  - If credentials are incorrect, alert shows "Invalid credentials!"
  - On successful login, user is taken to the home page.
  - Logout button becomes visible in the header.

---

## 4. Browsing and Adding Products to Cart

- On the home page, click any medicine category.
- Products in that category appear.
- You can:
  - Click **Add to Cart** on any product.
    - If logged in: item is added to cart, alert "Added to cart!"
    - If not logged in: alert "Please login to add items to the cart." and redirected to login.
  - Click on product card (outside "Add to Cart" button) to view detailed product info.
- Test quantity buttons and buy now button on product detail page.
- Buy now button:
  - If logged in: adds item to cart and navigates to cart page.
  - If not logged in: alert "Please login to buy products." and redirected to login.

---

## 5. Viewing and Managing Cart

- Click the cart icon in the header to open the cart page.
- Cart shows added items, quantities, prices, subtotal, and total.
- You can remove items using "Remove" buttons.
- Test adding/removing items, verify cart count updates.

---

## 6. Checkout Process

- On the cart page, click **Proceed to Checkout**.
- Expected behavior:
  - If logged in: order placed, order ID displayed on success page, cart emptied.
  - If not logged in: alert "Please login to proceed to checkout." and redirected to login.
- Click **Continue Shopping** to return to home page.

---

## 7. Logout

- Click the **Logout** button in the header.
- You are redirected to the login page.
- Logout button hides.
- Cart and user-specific actions are disabled until login.

---

## Notes

- The site uses `localStorage` to store user info, cart, products, and orders.
- Refreshing the page preserves login state if user is logged in.
- Clearing browser localStorage will reset all data.

---

## Troubleshooting

- Make sure JavaScript is enabled and no browser extensions are blocking localStorage.
- If errors occur, try clearing localStorage and refreshing.

---

# End of Testing Instructions
