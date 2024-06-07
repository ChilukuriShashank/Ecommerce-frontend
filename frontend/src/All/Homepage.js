import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../Css/Homepage.css';
import config from '../config';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize navigate

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
    const { productid } = product;
    const phoneNumber = '7036622150'; // Replace with a valid phone number
    
    // Construct the message with the product detail page link as a clickable URL
    const message = `Check out this product: ${window.location.origin}/viewproduct/${productid}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Construct the WhatsApp link with message
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };
  

  const handleProductClick = (pid) => {
    navigate(`/viewproduct/${pid}`); // Navigate to the product detail page
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
            <div key={product._id} className="product-box" onClick={() => handleProductClick(product.productid)}>
              {product.images && product.images.length > 0 && (
                <img src={product.images[0]} alt={product.name} className="product-image" />
              )}
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={(e) => { e.stopPropagation(); handleWhatsAppClick(product); }}>Send WhatsApp Message</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Homepage;
