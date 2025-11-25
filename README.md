# MediShop - Online Pharmacy E-commerce Website

A complete e-commerce website for medicines built with HTML, CSS, and JavaScript.

## Features

- **User Authentication**: Login/Register system with localStorage
- **4 Medicine Categories**: Ayurvedic, Homeopathic, Supplements, General Medicine
- **Product Listing**: Browse 16 different medical products
- **Product Details**: Complete product information with features
- **Shopping Cart**: Add/remove items with quantity management
- **Search**: Find products by name or description
- **Checkout**: Complete order simulation with order ID
- **Responsive Design**: Works on desktop, tablet, and mobile

## File Structure

```
medishop/
│
├── index.html       # Main HTML file
├── style.css        # All CSS styles
├── script.js        # JavaScript functionality
└── README.md        # This file
```

## How to Run

1. Extract the zip file
2. Open `index.html` in any web browser
3. Register a new account or login
4. Start shopping!

## SQL Database Structure

The website uses localStorage to simulate SQL functionality. 
Here are the database tables you would implement in a real SQL database:

### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100)
);
```

### Products Table
```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category ENUM('ayurvedic', 'homeopathic', 'supplements', 'general'),
    price DECIMAL(10,2) NOT NULL,
    icon VARCHAR(10),
    description TEXT,
    features TEXT
);
```

### Orders Table
```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(50) UNIQUE,
    user_id INT,
    total DECIMAL(10,2),
    order_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## Customization

### Adding New Products
Edit the `DB.products` array in `script.js`:

```javascript
{ 
    id: 17, 
    name: 'Product Name', 
    category: 'ayurvedic', 
    price: 299, 
    icon: '🌿', 
    description: 'Product description', 
    features: ['Feature 1', 'Feature 2'] 
}
```

### Changing Colors
Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #2ecc71;
    --secondary-color: #27ae60;
    /* Add more custom colors */
}
```

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, CSS Variables)
- JavaScript (ES6+)
- localStorage for data persistence

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

Free to use for educational purposes.

## Author

Created for college project assignment.
