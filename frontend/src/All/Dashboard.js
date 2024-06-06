import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Css/Dashboard.css';
import config from '../config';

const Message = ({ type, children }) => {
    return (
        <div className={`message ${type}`}>
            {children}
        </div>
    );
};

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/categories`,{
                    headers: {
                        'x-api-key': 'your-api-key-1' // Replace 'your-api-key' with your actual API key
                      },
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${config.apiUrl}/search`, {
                headers: {
                    'x-api-key': 'your-api-key-2' // Replace 'your-api-key' with your actual API key
                  },
                params: {
                    query: searchQuery,
                    category,
                    minPrice,
                    maxPrice
                }
            });
            setSearchResults(response.data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('No products found matching your search query.');
            setSearchResults([]);
        }
    };

    const handleUpdate = (productId) => {
        console.log(`Update product with ID: ${productId}`);
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`${config.apiUrl}/deleteproduct/${productId}`,{
                headers: {
                    'x-api-key': 'your-api-key-1' // Replace 'your-api-key' with your actual API key
                  },
            });
            setSearchResults(searchResults.filter(product => product.productid !== productId));
            setMessage("Deleted Successfully!!");
        } catch (error) {
            setMessage("Failed to Delete!!");
            console.error('Error deleting product:', error);
        }
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % searchResults.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + searchResults.length) % searchResults.length);
    };

    return (
        <div>
            <nav className="navbar">
                <Link to="/" className="logo">Your Logo</Link>
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                    />
                    <button type="submit">Search</button>
                </form>
                <Link to="/addproduct" className="add-product-btn">Add Product</Link>
            </nav>
            <div className="dashboard">
                <div className="filter-dropdown">
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        placeholder="Min Price"
                    />
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        placeholder="Max Price"
                    />
                </div>
                {errorMessage && <Message type="error">{errorMessage}</Message>}
                <p>{message}</p>
                <div className="search-results">
                    {searchResults.length > 0 && (
                        <div className="products-grid">
                            {searchResults.map((product, index) => (
                                <div key={product._id} className={`product-item ${index === currentImageIndex ? 'active' : ''}`}>
                                    {product.images && product.images.length > 0 && (
                                        <div className="image-container">
                                            <img
                                                src={product.images[currentImageIndex]}
                                                alt={product.name}
                                                className="product-image"
                                            />
                                            <button className="prev" onClick={handlePrevImage}>&#10094;</button>
                                            <button className="next" onClick={handleNextImage}>&#10095;</button>
                                        </div>
                                    )}
                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                        <p>Category: {product.category}</p>
                                        <p>Price: ${product.price}</p>
                                        <button onClick={() => handleUpdate(product.productid)}>Update</button>
                                        <button onClick={() => handleDelete(product.productid)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

