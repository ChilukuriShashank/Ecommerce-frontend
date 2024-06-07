import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Css/Viewproduct.css';
import config from '../config';

const ViewProduct = () => {
    const { pid } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/getproductsbyId/${pid}`, {
                    headers: {
                        'x-api-key': 'your-api-key-2' 
                    }
                });
                setProduct(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.error : 'Failed to fetch product.');
            }
        };

        fetchProduct();
    }, [pid]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!product) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="product-container">
            {product.images && product.images.length > 0 && (
                <img src={product.images[0]} alt={product.name} className="product-image" />
              )}
            <div className="product-details">
                <h1>{product.name}</h1>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Date Added:</strong> {new Date(product.date).toLocaleDateString()}</p>
                <h3>Available Sizes and Quantities:</h3>
                <ul>
                    {product.quantity.map((item, index) => (
                        <li key={index}>
                            <p><strong>Size:</strong> {item.size} - <strong>Quantity:</strong> {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewProduct;
