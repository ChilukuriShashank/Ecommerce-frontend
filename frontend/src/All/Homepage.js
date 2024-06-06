import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Homepage.css';
import config from '../config';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/getallproducts`, {
          headers: {
            'x-api-key': 'your-api-key-1'
          }
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${config.apiUrl}/search`, {
        headers: {
          'x-api-key': 'your-api-key-2'
        },
        params: {
          query: searchQuery,
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleWhatsAppClick = (product) => {
    const { name, description, price, images } = product;
    const phoneNumber = '7036622150'; // Replace with a valid phone number
    
    // Construct the message with both text and image URL
    const message = `Check out this product:\nName: ${name}\nDescription: ${description}\nPrice: $${price}\nImage: ${images[0]}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Construct the WhatsApp link with message
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div>
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <h1>All Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-list">
          {products.map(product => (
            <div key={product._id} className="product-box">
              {product.images && product.images.length > 0 && (
                <img src={product.images[0]} alt={product.name} className="product-image" />
              )}
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleWhatsAppClick(product)}>Send WhatsApp Message</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Homepage;
